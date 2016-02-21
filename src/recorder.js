(function () {
    'use strict';

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
                this.steps.push(data);
            }
        }
    };

    var getElementIndex = function (tagName, elem) {
        var allElems = document.getElementsByTagName(tagName);
        return Array.prototype.indexOf.call(allElems, elem);
    };

    var dispatcher = function (e) {
        var elem = e.target;
        var tagName = elem.tagName;
        var index = getElementIndex(tagName, elem);
        var data = {
            tagName: tagName,
            index: index,
            action: event.type
        };

        recorder.addEvent(data);
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
                        var recipe = window.recipe["RecordingRecipe-" + event.data.recordingCount] = new window.recipe.Recipe();
                        recipe.steps = s;
                        break;
                }
            }
        }, false);

        var body = document.body;
        body.addEventListener('click', dispatcher, true);
        //body.addEventListener('mouseup', dispatcher, true);
        //body.addEventListener('mousedown', dispatcher, true);
        //
        //body.addEventListener('keypress', dispatcher, true);
        //body.addEventListener('keydown', dispatcher, true);
        //body.addEventListener('keyup', dispatcher, true);
        //
        //window.addEventListener('scroll', dispatcher, true);
    };
    attachEvents();
})();