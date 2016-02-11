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
            var $li = $("<li>", {
                "data-recipeid": recipelist[i].id
            }).html("<span>" + recipelist[i].title + "</span>");
            $results.append($li);
            //window.recipelist.push(response[i].id);
        }
    }

    var runRecipe = function (recipeid) {
        var nn = function () {
            var s = document.createElement('script');
            s.textContent = 'window.recipe.RecipePlayer(window.recipe["{recipe}"])';
            (document.head || document.documentElement).appendChild(s);
            s.parentNode.removeChild(s);
        };

        chrome.tabs.executeScript({
            code: '(' + nn.toString().replace('{recipe}', recipeid) + ')();'
        });
    };

    $results.on('click', 'li', function () {
        var recipeid = $(this).data('recipeid');
        runRecipe(recipeid);
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
