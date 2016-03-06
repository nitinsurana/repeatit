var s = document.createElement('script');
s.src = chrome.extension.getURL("inject.js");
(document.head || document.documentElement).appendChild(s);
s.parentNode.removeChild(s);


window.addEventListener("message", function (event) {
    'use strict';
    if (event.data.type === "TO_REPEATIT") {        //Will be sent from inject.js
        switch (event.data.action) {
            case 'SAVE_RECORDING_STEPS':
                sendRecordingToBackground(event.data.steps, event.data.recipeId);
                break;
            case 'FETCH_RECORDINGS':
                fetchRecordingsFromBackground();
                break;
        }
    }
}, false);

function sendRecordingToBackground(steps, recipeId) {
    'use strict';
    chrome.runtime.sendMessage({origin: 'repeatit', action: 'recording', steps: steps, recipeId: recipeId},
        function (response) {
            if (!response.status) {
                console.log("Sending steps to extension failed : ");
                console.log(response);
            } else {
                console.log("Sent recorded steps to extension");
            }
        });
}

function fetchRecordingsFromBackground() {
    'use strict';
    chrome.runtime.sendMessage({origin: 'repeatit', action: 'fetchRecordings'},
        function (response) {
            if (!response) {
                console.log("Fetching recordings from extension failed : ");
                console.log(response);
            } else {
                console.log("Fetched recordings from extension.");
                window.postMessage({
                    type: "FROM_REPEATIT",
                    action: "FETCHED_RECORDINGS",
                    recipes: response
                }, '*');
            }
        });
}

