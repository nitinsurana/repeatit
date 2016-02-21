(function () {
    'use strict';

    window.background = {};

    var defaultSettings = {
        popup: false     //true means extension will open in a new window
    };

    chrome.browserAction.onClicked.addListener(function (activeTab) {       //DOCS - This event will not fire if the browser action has a popup.
        chrome.windows.create({
            url: chrome.extension.getURL('popup.html'),
            type: 'panel',
            height: 489,
            width: 500
        });
    });

    window.background.updatePopup = function (popup) {
        if (popup) {
            chrome.browserAction.setPopup({popup: ""});      //DOCS - If set to the empty string (''), no popup (new window) is shown.
        } else {
            chrome.browserAction.setPopup({popup: "popup.html"});
        }
    };

    chrome.runtime.onInstalled.addListener(function () {
        chrome.storage.sync.clear();

        chrome.storage.sync.get('settings', function (r) {
            if (r.settings) {
                defaultSettings = _.extend(defaultSettings, r.settings);
            }
            chrome.storage.sync.set({"settings": defaultSettings}, function () {
                console.log("Saved settings to storage: ");
            });
            window.background.updatePopup(defaultSettings.popup);
        });

        var recipesJsonUrl = 'https://rawgit.com/nitinsurana/repeatit/master/src/recipes.json';
        //@ifdef DEBUG
        recipesJsonUrl = chrome.extension.getURL('recipes.json');
        //@endif
        $.ajax({
            url: recipesJsonUrl,
            dataType: 'json'
        }).done(function (response) {
            window.background.recipelist = response;
            _.each(response, function (recipe) {
                if (recipe.params) {
                    var storageKey = 'params-' + recipe.id,
                        parameterSets = {};
                    parameterSets[storageKey] = recipe.params;
                    chrome.storage.sync.get(storageKey, function (result) {
                        if (!result[storageKey]) {
                            chrome.storage.sync.set(parameterSets, function () {
                                console.log("Saved ParameterSets to storage : " + recipe.id);
                            });
                        } else {
                            console.log("ParameterSets already found : " + recipe.id);
                        }
                    });
                }
            });
        });
    });
})();