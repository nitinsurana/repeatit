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

    var findPerfectSelector = function ($ele) {
        var id = $ele.attr('id');
        var clazz = $ele.attr('id');
        var selector = '';
        if (id) {
            $("[id='" + id + "']").each(function () {

            });
        } else if (clazz) {
            return;
        } else {
            var elem = $ele.get(0);
            var tagName = elem.tagName;
            var index = getElementIndex(tagName, elem);
            return {tagName: tagName, index: index};
        }
    };


    var getElementIndex = function (tagName, elem) {
        var allElems = document.getElementsByTagName(tagName);
        return Array.prototype.indexOf.call(allElems, elem);
    };

    //var dispatcher = function (e) {
    //    var $elem = $(e.target);
    //    var data = {
    //        action: event.type
    //    };
    //    recorder.addEvent(data);
    //};

    var getXpath = function (el) {
        //if (typeof el == "string") return document.evaluate(el, document, null, 0, null)
        if (!el || el.nodeType != 1) return '';
        //if (el.id) return "//*[@id='" + el.id + "']"
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
        if (elem.tagName === "INPUT" || elem.tagName === "TEXTAREA") {
            data.value = elem.value;
            data.action = 'input';
        }
        if (tagName === 'input' && event.type === 'keyup' || event.type === 'keydown' || event.type === 'keypress') {
            data.keyCode = event.keyCode;
            if (event.keyCode === 13) {         // for <input> elements, set action to key events only when ENTER (13) is pressed.
                data.action = event.type;
            }
        }
        data && recorder.addEvent(data);
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
                        break;
                }
            }
        }, false);

        var body = document.body;
        body.addEventListener('click', dispatcher, true);
        //body.addEventListener('input', dispatcher, true);       //contenteditable
        body.addEventListener('mouseup', dispatcher, true);
        body.addEventListener('mousedown', dispatcher, true);
        //
        body.addEventListener('keypress', dispatcher, true);
        body.addEventListener('keydown', dispatcher, true);
        body.addEventListener('keyup', dispatcher, true);
        //window.addEventListener('scroll', dispatcher, true);
    };
    attachEvents();
})();