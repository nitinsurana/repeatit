(function () {
    'use strict';

    window.background = {};

    window.background.serverUrl = 'http://46.101.206.151:5000';
    //@ifdef DEBUG
    window.background.serverUrl = 'http://localhost:5000';
    //@endif
    var serverUrl = window.background.serverUrl;

    var settings = window.background.settings = {
        defaultProject: "edulastic",
        newWindow: false,     //true means extension will open in a new window
        autoClose: true
    };

    chrome.browserAction.onClicked.addListener(function (activeTab) {       //DOCS - This event will not fire if the browser action has a popup.
        chrome.windows.getAll(function (r) {        //Close existing popup window
            r.forEach(function (w) {
                if (w.type === 'popup') {
                    chrome.tabs.query({
                        active: true,
                        windowId: w.id
                    }, function (tabs) {
                        for (var i in tabs) {
                            var t = tabs[i];
                            if (t.title.indexOf("RepeatIt") > -1) {
                                chrome.tabs.remove(t.id);
                            }
                        }
                    });
                }
            });
            chrome.windows.create({
                url: chrome.extension.getURL('popup.html'),
                type: 'panel',
                height: 489,
                width: 500
            });
        });
    });

    window.background.updatePopup = function (newWindow) {
        if (newWindow) {
            chrome.browserAction.setPopup({popup: ""});      //DOCS - If set to the empty string (''), no popup (new window) is shown.
        } else {
            chrome.browserAction.setPopup({popup: "popup.html"});
        }
    };

    chrome.storage.local.get('settings', function (r) {
        if (r.settings) {
            settings = _.extend(settings, r.settings);
        }
        chrome.storage.local.set({"settings": settings}, function () {
            console.log("Saved settings to storage: ");
        });
        window.background.updatePopup(settings.newWindow);
    });

    function getRandomToken() {
        // E.g. 8 * 32 = 256 bits token
        var randomPool = new Uint8Array(32);
        window.crypto.getRandomValues(randomPool);
        var hex = '';
        for (var i = 0; i < randomPool.length; ++i) {
            hex += randomPool[i].toString(16);
        }
        // E.g. db18458e2782b2b77e36769c569e263a53885a9944dd0a861e5064eac16f1a
        return hex;
    }

    chrome.runtime.onInstalled.addListener(function () {
        chrome.storage.local.get('userId', function (r) {
            if (!r.userId) {
                var uniqueKey = getRandomToken();
                chrome.storage.local.set({"userId": uniqueKey}, function () {
                    console.log("Saved unique installationId in storage : " + uniqueKey);
                });
            } else {
                console.log("Found unique installationId in storage :" + r.userId);
            }
        });
    });


    var recipesJsonUrl = chrome.extension.getURL('recipes.json');
    console.log(recipesJsonUrl);
    $.ajax({
        url: recipesJsonUrl,
        dataType: 'json'
    }).done(function (response) {
        console.log('loading json');
        console.log(response);
        updateRecipeList(response);
        _.each(response, function (recipe) {
            if (recipe.pSets) {
                var storageKey = 'pSets-' + recipe._id,
                    store = {};
                store[storageKey] = recipe.pSets;
                chrome.storage.local.get(storageKey, function (result) {
                    if (!result[storageKey]) {
                        chrome.storage.local.set(store, function () {
                            console.log("Saved pSets to storage : " + recipe._id);
                        });
                    } else {
                        console.log("pSets already found : " + recipe._id);
                    }
                });
            }
        });
    });

    var fetchUserRecordings = function () {
        //Remove existing user recordings
        var recipelist = _.filter(window.background.recipelist, function (r) {
            return r.project !== 'recording';
        });
        window.background.recipelist = recipelist;
        chrome.storage.local.get('userId', function (r) {
            var userId = r.userId;
            $.ajax({
                url: serverUrl + '/recordings',
                data: {
                    userId: userId
                }
            }).done(function (response) {
                updateRecipeList(response);
            });
        });
    };
    fetchUserRecordings();


    var updateRecipeList = function (recipes) {
        if (!Array.isArray(recipes)) {
            recipes = [recipes];
        }
        var recipelist = window.background.recipelist || [];
        if (recipelist.length === 0) {
            recipelist = recipes;
        } else {
            _.each(recipes, function (recipeToMerge) {
                var foundRecipe = _.find(recipelist, function (r) {
                    return r._id === recipeToMerge._id;
                });
                if (!foundRecipe) {
                    recipelist.push(recipeToMerge);
                } else {
                    _.extend(foundRecipe, recipeToMerge);
                }
            });
        }
        window.background.recipelist = recipelist;
    };

    chrome.runtime.onMessage.addListener(
        function (message, sender, sendResponse) {
            if (message.origin === 'repeatit') {
                switch (message.action) {
                    case 'recording':       //recording has been stopped
                        var recipe = {
                            steps: message.steps,
                            _id: message._id,
                            title: message.title
                        };
                        sendRecordingToMongo(sendResponse, recipe);
                        break;
                    case 'fetchRecordings':
                        sendRecordingsToTab(sendResponse);
                        break;
                    case 'recordUsage':
                        recordRecipeUsage(sendResponse, message);
                        break;
                    case 'updateRecording':
                        sendRecordingToMongo(sendResponse, message.recipe);
                        break;
                    case 'deleteRecording':
                        deleteRecordingFromMongo(sendResponse, message._id);
                        break;
                }
                return true;
            } else {
                console.log("Invalid message sent to extension");
                console.log(sender);
                sendResponse({status: false});
            }
        });

    var recordRecipeUsage = function (sendResponse, message) {
        chrome.storage.local.get('userId', function (r) {
            var userId = r.userId;
            message.userId = userId;
            $.ajax({
                url: serverUrl + '/usage',
                type: 'POST',
                data: message
            }).done(function () {
                console.log("Saved usage to Mongo");
                sendResponse({status: true});
            }).fail(function () {
                console.log("Unable to save usage to Mongo");
                sendResponse({status: false});
            });
        });
    };

    var sendRecordingsToTab = function (sendResponse) {
        var recipelist = window.background.recipelist;
        var response = _.filter(recipelist, function (r) {
            return r.project === 'recording';
        });
        sendResponse(response);
    };


    var deleteRecordingFromMongo = function (sendResponse, _id) {
        chrome.storage.local.get('userId', function (r) {
            var userId = r.userId;
            $.ajax({
                url: serverUrl + '/del-record',
                data: {
                    _id: _id,
                    userId: userId
                }
            }).done(function (response) {
                console.log("Deleted recording from server : ");
                console.log(response);
                sendResponse({status: true});
            }).fail(function (response) {
                console.log("Unable to delete recording on server : ");
                console.log(response);
                sendResponse({status: false});
            }).always(function () {
                fetchUserRecordings();
            });
        });
    };

    var sendRecordingToMongo = function (sendResponse, recipe) {
        chrome.storage.local.get('userId', function (r) {
            recipe.userId = recipe.userId || r.userId;
            recipe.project = recipe.project || "recording";
            $.ajax({
                url: serverUrl + '/record',
                type: 'post',
                data: recipe
            }).done(function (response) {
                console.log("Recipe saved on server");
                sendResponse({status: true, recipe: response});
                updateRecipeList(response);
            }).fail(function () {
                console.log("Unable to save recipe on server");
                sendResponse({status: false});
            });
        });
    };
})();