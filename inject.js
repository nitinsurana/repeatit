function Recipe(e) {
    this.start = function () {
    }, this.stop = function () {
    }, this.steps = [], this.wait = 20
}
function RecipePlayer(e) {
    var t = 0, c = 0, s = function (t, o) {
        if (o != t.length)var n = setInterval(function () {
            var a = t[o], l = $(a.selector);
            if (l.length > 0)i(l, a.action), clearInterval(n), c = 0, s(t, ++o); else {
                console.log("Looking for " + a.selector), c++;
                var r = t.wait || e.wait;
                c > r && (c = 0, o--)
            }
        }, 500)
    }, i = function (e, t) {
        if ("function" == typeof t)t.call(e); else switch (t) {
            case"click":
                e.click();
                break;
            default:
                e.click()
        }
    };
    "function" == typeof e.start && e.start.call(e), s(steps, t), "function" == typeof e.stop && e.stop.call(e)
}
window.recipe = {}, window.recipelist = ["PassageCreateRecipe"], function () {
    var e = [{selector: "#create-assessment-with-val"}, {selector: "span.lsm-create-btn:first"}, {
        selector: "#qtn-passage-type",
        wait: 100
    }, {
        selector: "#passage_title", action: function () {
            $(this).redactor("set", "something random")
        }
    }, {
        selector: ".tab-title-text", action: function () {
            $(this).html("title...")
        }
    }, {
        selector: "#question-edit-passage-text", action: function () {
            $(this).redactor("set", "something random")
        }
    }, {selector: "#saveQuestionDetails1", action: "click"}, {
        selector: ".add-question[style]",
        action: "click"
    }, {selector: "span.lsm-create-btn:visible", action: "click"}, {
        selector: "#qtn-true-false-type",
        action: "click"
    }, {
        selector: "#question-raw-content", action: function () {
            $(this).redactor("set", "p0")
        }
    }, {selector: ".true-false-answer-select:eq(0)", action: "click"}, {
        selector: "#saveQuestionDetails1",
        action: "click"
    }, {selector: ".as-question-editor-back"}, {
        selector: ".add-question[style]",
        action: "click"
    }, {selector: "span.lsm-create-btn:visible", action: "click"}, {
        selector: "#qtn-true-false-type",
        action: "click"
    }, {
        selector: "#question-raw-content", action: function () {
            $(this).redactor("set", "p1")
        }
    }, {selector: ".true-false-answer-select:eq(1)", action: "click"}, {
        selector: "#saveQuestionDetails1",
        action: "click"
    }, {selector: ".as-question-editor-back"}, {
        selector: ".add-question[style]",
        action: "click"
    }, {selector: "span.lsm-create-btn:visible", action: "click"}, {
        selector: "#qtn-true-false-type",
        action: "click"
    }, {
        selector: "#question-raw-content", action: function () {
            $(this).redactor("set", "p2")
        }
    }, {selector: ".true-false-answer-select:eq(0)", action: "click"}, {
        selector: "#saveQuestionDetails1",
        action: "click"
    }, {selector: ".as-question-editor-back"}], t = window.recipe.PassageCreateRecipe = new Recipe(e);
    t.start = function () {
        Backbone.history.loadUrl("#createAssessment/close?cm=assessment")
    }
}();