(function () {
    'use strict';
    var steps = [
        {
            selector: '#content-solution',
            action: 'redactor'
        },
        {
            selector: '#content-hint',
            action: 'redactor'
        }
    ];
    var recipe = window.recipe.FillSolutionHintRecipe = new window.recipe.Recipe(steps);
    recipe.start = function (params) {
        this.steps[0].value = params.solution;
        this.steps[1].value = params.hint;
        return $.Deferred().resolve();
    };
})();