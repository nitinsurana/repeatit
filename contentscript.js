var s = document.createElement('script');
//s.src = chrome.extension.getURL("inject.js");             //Un-comment for local extension testing
s.src = 'https://rawgit.com/nitinsurana/repeatit/master/inject.js';
(document.head || document.documentElement).appendChild(s);
s.parentNode.removeChild(s);

(function () {
    window.addEventListener("message", function (event) {
        if (event.data.type === "FROM_EDULASTIC") {
            switch (event.data.action) {
                case 'STOPPED_RECORDING':
                    addRecordingToExtension(event.data.steps);
                    break;
            }
        }
    }, false);

    function addRecordingToExtension(steps) {
        chrome.runtime.sendMessage({
            action: 'ADD_RECORDING',
            steps: steps
        }, function (response) {
            console.log(response.status);
        });
    }
})();
