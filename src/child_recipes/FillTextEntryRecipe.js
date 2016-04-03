(function () {
    'use strict';
    var id = "FillTextEntryRecipe";
    var steps = [
        {
            selector: '#question-raw-content',
            action: 'redactorInsert'
        },
        {
            selector: '.get-user-entry',
            action: function () {
                this.val('Correct Answer').trigger('keyup');
            },
            value: 'Correct Answer'
        },
        {
            selector: '.accept_answer'
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

    var recipe = window.recipe.FillTextEntryRecipe = new window.recipe.Recipe(steps, id);
    recipe.start = function (params) {
        this.steps[0].value = params.questionTitle;
        return $.Deferred().resolve();
    };
})();
