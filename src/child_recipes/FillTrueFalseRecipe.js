(function () {
    'use strict';
    var id = "FillTrueFalseRecipe";
    var steps = [
        {
            selector: '#question-raw-content',
            action: 'redactor'
        },
        {
            selector: '.true-false-answer-select:eq(0)',
            action: 'click'
        },
        {
            type: 'recipe',
            _id: 'FillSolutionHintRecipe',
            pSet: "default"
        },
        {
            selector: '#saveQuestionDetails1',
            action: 'click'
        }
    ];

    var recipe = window.recipe.FillTrueFalseRecipe = new window.recipe.Recipe(steps, id);
    recipe.start = function (params) {
        var defer = $.Deferred();
        if ($(this.steps[0].selector).length === 0) {
            var msg = "Please make sure to be in true/false question authoring view before using this recipe";
            defer.reject(msg);
        } else {
            defer.resolve();
        }
        this.steps[0].value = params.questionTitle;
        var answerIndex = Math.round(Math.random());
        this.steps[1].selector = '.true-false-answer-select:eq(' + answerIndex + ')';
        return defer.promise();
    };
})();
