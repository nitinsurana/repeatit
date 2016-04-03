(function () {
    'use strict';
    var id = "MultipleChoiceCreateRecipe";
    var steps = [
        {
            type: 'recipe',
            _id: 'OpenQuestionAuthoringRecipe',
            pSet: "mc"
        },
        {
            type: 'recipe',
            _id: 'FillMultipleChoiceRecipe',
            pSet: "default"
        },
        {
            selector: '.lsm-createAssignment-done.selected'
        }
    ];
    var recipe = window.recipe.MultipleChoiceCreateRecipe = new window.recipe.Recipe(steps, id);
    recipe.start = function (params) {
        return $.Deferred().resolve();
    };
})();
