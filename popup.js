$(function () {
    var $results = $("#results");
    $results.html('<li>Loading...</li>');

    var recipelist = undefined;
    chrome.storage.sync.get('recipelist', function (result) {
        recipelist = result.recipelist;
        createRecipeLIs();
    });

    function createRecipeLIs() {
        $results.empty();
        for (var i in recipelist) {
            if (recipelist[i].type === "child") {
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

    var runRecipe = function (recipeid, paramSetName) {
        var nn = function () {
            var s = document.createElement('script');
            s.textContent = 'window.recipe.RecipePlayer(window.recipe["{recipe}"],"{params}")';
            (document.head || document.documentElement).appendChild(s);
            s.parentNode.removeChild(s);
        };

        var storageKey = 'params-' + recipeid;
        chrome.storage.sync.get(storageKey, function (result) {
            var recipeParams = result[storageKey] && result[storageKey][paramSetName];
            chrome.tabs.executeScript({
                code: '(' + nn.toString().replace('{recipe}', recipeid).replace('{params}', window.encodeURIComponent(JSON.stringify(recipeParams)).replace('\'', '')) + ')();'
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

    $(document).click(function () {
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
            chrome.storage.sync.set({'recipelist': recipelist}, function () {
                console.log("Updated recipelist in Chrome Storage");
            });

            createRecipeLIs();
        });
    });

    $("#replay-recording").click(function () {
        chrome.storage.sync.get('recordingCount', function (c) {
            var recordingCount = c.recordingCount || 0;
            runRecipe('RecordingRecipe-' + recordingCount);
        });
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
