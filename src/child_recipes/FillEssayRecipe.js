(function () {
    'use strict';
    var id = "FillEssayRecipe";
    var steps = [
        {
            selector: '#question-raw-content',
            action: 'redactor'
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

    var recipe = window.recipe.FillEssayRecipe = new window.recipe.Recipe(steps, id);
    recipe.start = function (params) {
        this.steps[0].value = params.questionTitle;
        return $.Deferred().resolve();
    };
})();
