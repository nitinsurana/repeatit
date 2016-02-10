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
            s.textContent = 'window.recipe.RecipePlayer({recipe})';
            (document.head || document.documentElement).appendChild(s);
            s.parentNode.removeChild(s);
        };

        chrome.tabs.executeScript({
            code: '(' + nn.toString().replace('{recipe}', 'window.recipe.' + recipeid) + ')();'
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
        chrome.tabs.executeScript({
            code: "window.postMessage({type:'FROM_REPEATIT',action:'START_RECORDING'},'*');"
        });
    });

    $("#stop-recording").click(function () {
        chrome.tabs.executeScript({
            code: "window.postMessage({type:'FROM_REPEATIT',action:'STOP_RECORDING'},'*');"
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

    chrome.runtime.onMessage.addListener(function (message, MessageSender, sendReponse) {
        // Sender MessageSender: https://developer.chrome.com/extensions/runtime#type-MessageSender
        // function sendResponse: needed to send response, not needed in current context (?)
        console.log("Got message from content_script : " + message);
        switch (message.action) {
            case 'ADD_RECORDING':
                addRecordingToRecipes(message.steps);
                break;
        }

        sendReponse({status: "success"});
    });

    function addRecordingToRecipes(steps) {
        var recordingCount = 0;
        chrome.storage.sync.get('recordingCount', function (c) {
            var recordingCount = c.recordingCount || 0;
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
            chrome.storage.sync.set({'recordingCount': recordingCount}, function () {
                console.log("Saved recordingCount Chrome Storage");
            });
        });
    }
});
