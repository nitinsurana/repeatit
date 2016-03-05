(function () {
    'use strict';

    var extensionId = window.recipe.extensionId;

    var recorder = window.recipe.Recorder = {
        isRecording: false,
        startRecording: function () {
            this.steps = [];
            this.isRecording = true;
        },
        stopRecording: function () {
            this.isRecording = false;
            return this.steps;
        },
        addEvent: function (data) {
            if (this.isRecording) {
                var lastEntry = this.steps.pop();
                if (!lastEntry) {
                    this.steps.push(data);
                } else {
                    if (data.tagName === lastEntry.tagName &&
                        data.index === lastEntry.index &&
                        data.action === lastEntry.action &&
                        data.xpath === lastEntry.xpath) {       //If the lastEntry is same as current one, then keep the current one with the updated value/keyCode
                        this.steps.push(data);
                    } else {
                        this.steps.push(lastEntry);
                        this.steps.push(data);
                    }
                }
            }
        }
    };

    var getElementIndex = function (tagName, elem) {
        var allElems = document.getElementsByTagName(tagName);
        return Array.prototype.indexOf.call(allElems, elem);
    };

    var getXpath = function (el) {
        if (!el || el.nodeType != 1) return '';
        var sames = [].filter.call(el.parentNode.children, function (x) {
            return x.tagName == el.tagName;
        });
        return getXpath(el.parentNode) + '/' + el.tagName.toLowerCase() + (sames.length > 1 ? '[' + ([].indexOf.call(sames, el) + 1) + ']' : '');
    };

    var dispatcher = function (e) {
        var elem = e.target;
        var tagName = elem.tagName;
        var index = getElementIndex(tagName, elem);
        var data = {
            tagName: tagName,
            index: index,
            action: event.type,
            xpath: getXpath(elem)
        };

        if (tagName === 'INPUT' && (event.type === 'keyup' || event.type === 'keydown' || event.type === 'keypress')) {
            if (event.keyCode === 13) {         // for <input> elements, set action to key events only when ENTER (13) is pressed.
                data.keyCode = event.keyCode;
                data.action = event.type;
            } else {
                data = null;
            }
        } else if (event.type === 'input') {               //Will be triggered for <input> also.
            if (elem.contentEditable === true) {
                data.action = 'contenteditable';
                data.value = elem.innerHTML;
            } else if (elem.tagName === "INPUT" || elem.tagName === "TEXTAREA") {
                data.value = elem.value;
            } else {
                data = undefined;
            }
        }
        data && recorder.addEvent(data);
    };

    var sendStepsToExtension = function (steps, recipeId) {
        chrome.runtime.sendMessage(extensionId, {origin: 'repeatit', action: 'recording', steps: steps, recipeId: recipeId},
            function (response) {
                if (!response.status) {
                    console.log("Sending steps to extension failed : ");
                    console.log(response);
                } else {
                    console.log("Sent recorded steps to extension");
                }
            });
    };

    var attachEvents = function () {
        window.addEventListener("message", function (event) {
            if (event.data.type === "FROM_REPEATIT") {
                switch (event.data.action) {
                    case 'START_RECORDING':
                        window.recipe.Recorder.startRecording();
                        break;
                    case 'STOP_RECORDING':
                        var s = window.recipe.Recorder.stopRecording();
                        var id = "RecordingRecipe-" + event.data.recordingCount;
                        window.recipe[id] = new window.recipe.Recipe(s, id);
                        sendStepsToExtension(s, id);
                        break;
                }
            }
        }, false);

        var body = document.body;
        body.addEventListener('click', dispatcher, true);
        body.addEventListener('mouseup', dispatcher, true);
        body.addEventListener('mousedown', dispatcher, true);

        body.addEventListener('input', dispatcher, true);

        body.addEventListener('keypress', dispatcher, true);
        body.addEventListener('keydown', dispatcher, true);
        body.addEventListener('keyup', dispatcher, true);
        //window.addEventListener('scroll', dispatcher, true);
    };
    attachEvents();
})();