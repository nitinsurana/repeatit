$(function () {
    'use strict';

    var $results = $("#results");
    $results.html('<li>Loading...</li>');

    $('[data-toggle="tooltip"]').tooltip();

    var recipelist = chrome.extension.getBackgroundPage().background.recipelist;

    function createRecipeLIs(project) {
        $results.empty();
        for (var i in recipelist) {
            if (recipelist[i].project != project || recipelist[i].type === "child") {
                continue;
            }
            var $li = $("<li>", {
                "data-recipeid": recipelist[i].id
            }).html("<span>" + recipelist[i].title + "</span>");
            if (recipelist[i].params && Object.keys(recipelist[i].params).length > 0) {
                for (var setName in recipelist[i].params) {
                    //Todo use <span class="badge">4</span> instead of button
                    $li.append('<button type="button" class="pull-right btn btn-default btn-xs" data-setname="' + setName + '">' + setName + '</button>');
                }
            }
            $results.append($li);
        }
    }

    function executeScriptInCurrentTab(code) {
        chrome.windows.getAll(function (r) {
            var eduWindow;
            r.forEach(function (w) {
                if (w.type === 'normal' && w.state === 'maximized') {
                    eduWindow = w;
                    return false;
                }
            });
            if (eduWindow) {
                chrome.tabs.query({
                    active: true,
                    windowId: eduWindow.id
                }, function (t) {
                    if (t.length == 1) {
                        chrome.tabs.executeScript(t[0].id, {
                            code: code
                        });
                    }
                });
            }
        });
    }

    createRecipeLIs("ls");

    var runRecipe = function (recipeId, paramSetName) {
        chrome.storage.sync.get('settings', function (r) {
            if (!r.settings.popup) {        //Close the extension if popup is false
                window.close();
            }
        });

        var nn = function () {
            var s = document.createElement('script');
            s.textContent = 'window.recipe.RecipePlayer(window.recipe["{recipe}"],"{params}")';
            (document.head || document.documentElement).appendChild(s);
            s.parentNode.removeChild(s);
        };

        var storageKey = 'params-' + recipeId;
        chrome.storage.sync.get(storageKey, function (result) {
            var recipeParams = {
                self: result[storageKey] && result[storageKey][paramSetName]
            };
            var promises = [];
            for (var i in recipelist) {
                var recipe = recipelist[i];
                if (recipe.id === recipeId) {
                    for (var j in recipe.children) {
                        var childRecipeId = recipe.children[j];
                        var defer = $.Deferred();
                        promises.push(defer.promise());

                        (function (childRecipeId, deferred) {
                            var childStorageKey = 'params-' + childRecipeId;
                            chrome.storage.sync.get(childStorageKey, function (childResult) {
                                recipeParams[childRecipeId] = childResult[childStorageKey];      //all parameter-sets for child
                                deferred.resolve();
                            });
                        })(childRecipeId, defer);
                    }
                    break;
                }
            }
            $.when.apply($, promises)
                .then(function () {
                    var code = '(' + nn.toString().replace('{recipe}', recipeId).replace('{params}', window.encodeURIComponent(JSON.stringify(recipeParams)).replace('\'', '')) + ')();';
                    executeScriptInCurrentTab(code);
                });
        });
    };

    $results.on('click', 'li', function (e) {
        var recipeid = $(e.currentTarget).data('recipeid');
        var setName = $(e.target).data('setname');
        if ($(e.currentTarget).find("button.btn-xs").length > 0 && !setName) {      //Don't run recipe with require paramSets without a paramSet (click on btn instead of li)
            return;
        }
        runRecipe(recipeid, setName);
    });

    $('#closePopup').click(function () {
        window.close();
    });

    $("#start-recording").click(function () {
        chrome.storage.sync.get('recordingCount', function (c) {
            var recordingCount = c.recordingCount || 0;
            recordingCount++;
            chrome.storage.sync.set({'recordingCount': recordingCount}, function () {
                console.log("Incremented recordingCount Chrome Storage");
            });
            chrome.tabs.executeScript({
                code: "window.postMessage({type:'FROM_REPEATIT',action:'START_RECORDING'},'*');"
            });
        });
    });

    $("#stop-recording").click(function () {
        chrome.storage.sync.get('recordingCount', function (c) {
            var recordingCount = c.recordingCount;
            chrome.tabs.executeScript({
                code: "window.postMessage({type:'FROM_REPEATIT',action:'STOP_RECORDING', recordingCount:" + recordingCount + "},'*');"
            });
            var recipeData = {
                "id": "RecordingRecipe-" + recordingCount,
                "title": "Recording Recipe - " + recordingCount,
                "description": "...",
                "version": "0.1"
            };
            recipelist.push(recipeData);
            //Todo figure out a way to not lose recorded recipes
            //chrome.storage.sync.set({'recipelist': recipelist}, function () {
            //    console.log("Updated recipelist in Chrome Storage");
            //});

            createRecipeLIs();
        });
    });

    $("#replay-recording").click(function () {
        chrome.storage.sync.get('recordingCount', function (c) {
            var recordingCount = c.recordingCount || 0;
            runRecipe('RecordingRecipe-' + recordingCount);
        });
    });

    $("a[data-toggle='tab']").on('shown.bs.tab', function (e) {
        var project = $(e.currentTarget).data('project') || "ls";
        createRecipeLIs(project);
    });

    setTimeout(function () {
        $("#search").focus();
    }, 100);


    var searchTimeout = null;

    function findRecipes(searchTerm) {
        $results.find("li").each(function () {
            if ($(this).text().toLowerCase().indexOf(searchTerm) == -1) {
                $(this).hide();
            } else {
                $(this).show();
            }
        });
    }

    $('#search').keyup(function () {
        clearTimeout(searchTimeout);
        var $target = $(this);
        searchTimeout = setTimeout(function () {
            findRecipes($target.val());
        }, 200);
    });

});
