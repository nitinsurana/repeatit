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
            var $div = $("<div>", {
                "class": "col-12 controlled-text"
            }).html(recipelist[i].title);
            var $params = "";
            if ("object" === typeof recipelist[i].pSets) {
                recipelist[i].pSets.forEach(function (pset) {
                    var setTitle = pset.title;
                    $params += "<span class='pull-right label label-primary ri-param-badge' data-settitle='" + setTitle + "'>" + setTitle + "</span>";
                });
            }
            $div.append($params);
            var $li = $("<li>", {
                "data-recipeid": recipelist[i]._id,
                "class": "row"
            }).html($div);
            $li.append($div);
            $results.append($li);
        }
    }

    function executeScriptInCurrentTab(code) {
        chrome.windows.getAll(function (r) {
            r.forEach(function (w) {
                if (w.type === 'normal') {
                    chrome.tabs.query({
                        active: true,
                        windowId: w.id
                    }, function (t) {
                        if (t.length == 1) {
                            chrome.tabs.executeScript(t[0].id, {
                                code: code
                            });
                            chrome.storage.sync.get('settings', function (r) {
                                if (!r.settings.newWindow && r.settings.autoClose) {        //Close extension if it's opened in popup and autoClose:true
                                    window.close();
                                }
                            });
                        }
                    });
                }
            });
        });
    }

    // active project tab based on the "Default Project Settings".
    chrome.storage.sync.get('settings', function (r) {
        var defaultProject = r.settings['defaultProject'];
        $(".nav a[data-project='" + defaultProject + "']").tab('show');
    });

    var runRecipe = function (recipeId, pSetName) {
        var nn = function () {
            var s = document.createElement('script');
            s.textContent = 'window.recipe.RecipePlayer(window.recipe["{id}"],"{set}","{options}","{settings}")';
            (document.head || document.documentElement).appendChild(s);
            s.parentNode.removeChild(s);
        };

        var out = fetchRecurPSets(undefined, recipeId);

        $.when.apply($, out.promises)
            .then(function () {
                chrome.storage.sync.get('settings', function (r) {
                    var settings = r.settings;
                    var code = '(' + nn.toString();
                    code = code.replace('{id}', recipeId);
                    code = code.replace('{options}', window.encodeURIComponent(JSON.stringify(out.options)).replace(/'/g, ''));
                    code = code.replace('{settings}', window.encodeURIComponent(JSON.stringify(settings)).replace(/'/g, ''));
                    code = code.replace('{set}', pSetName);
                    code = code + ')();';
                    executeScriptInCurrentTab(code);
                });
            });
    };

    var fetchRecurPSets = function (out, recipeId) {
        out = out || {
                promises: [],
                options: []
            };
        var defer = $.Deferred();
        out.promises.push(defer);
        var storageKey = 'pSets-' + recipeId;
        chrome.storage.sync.get(storageKey, function (result) {
            var pSets = result[storageKey] || {};
            out.options.push({_id: recipeId, pSets: pSets});
            defer.resolve();
        });
        var recipe = recipelist.find(function (r) {
            return r._id === recipeId;
        });
        if (typeof recipe.dependsOn === 'object') {       //typeof array then
            recipe.dependsOn.forEach(function (rId) {
                fetchRecurPSets(out, rId);
            });
        }
        return out;
    };

    $results.on('click', 'li', function (e) {
        var recipeid = $(e.currentTarget).data('recipeid');
        var setTitle = $(e.target).data('settitle');
        if ($(e.currentTarget).find("span.ri-param-badge").length > 0 && !setTitle) {      //Don't run recipe, which require paramSets, without a paramSet (click on li instead of span)
            return;
        }
        runRecipe(recipeid, setTitle);
    });

    $('#closePopup').click(function () {
        window.close();
    });

    $("body").on('click', "#start-recording:not(.disabled)", function () {
        chrome.storage.sync.get('recordingCount', function (c) {
            var recordingCount = c.recordingCount || 0;
            recordingCount++;
            chrome.storage.sync.set({'recordingCount': recordingCount}, function () {
                console.log("Incremented recordingCount Chrome Storage");
            });
            var code = "window.postMessage({type:'FROM_REPEATIT',action:'START_RECORDING'},'*');";
            executeScriptInCurrentTab(code);
            chrome.browserAction.setBadgeText({text: "Rec"});
            $("#start-recording").addClass("disabled");
            $("#stop-recording").removeClass("disabled");
        });
    });

    $("body").on('click', "#stop-recording:not(.disabled)", function () {
        chrome.storage.sync.get('recordingCount', function (c) {
            var recordingCount = c.recordingCount;
            var code = "window.postMessage({type:'FROM_REPEATIT',action:'STOP_RECORDING', recordingCount:" + recordingCount + "},'*');";
            executeScriptInCurrentTab(code);
            var recipeData = {
                "id": "RecordingRecipe-" + recordingCount,
                "recipeId": "RecordingRecipe-" + recordingCount,
                "title": "RecordingRecipe-" + recordingCount,
                "description": "...",
                "version": "0.1",
                "project": "recording"
            };
            recipelist.push(recipeData);
            $("a[data-toggle='tab'][data-project='recording']").closest('li').removeClass('active').find('a').click();
            chrome.browserAction.setBadgeText({text: ""});
            $("#stop-recording").addClass("disabled");
            $("#start-recording").removeClass("disabled");
        });
    });

    $("a[data-toggle='tab']").on('shown.bs.tab', function (e) {
        var project = $(e.currentTarget).data('project') || "ls";
        createRecipeLIs(project);
        var searchTerm = $("#search").val();
        searchTerm && findRecipes(searchTerm);
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

    chrome.browserAction.getBadgeText({}, function (r) {
        if (r === 'Rec') {      //If a recording is in progress and popup is re-opened
            $("#start-recording").addClass('disabled');
            $("#stop-recording").removeClass('disabled');
        }
    });
});
