(function () {
    'use strict';
    var id = "MultipleSelectionCreateRecipe";
    var steps = [
        {
            type: 'recipe',
            _id: 'OpenQuestionAuthoringRecipe',
            pSet: "ms"
        },
        {
            type: 'recipe',
            _id: 'FillMultipleSelectionRecipe',
            pSet: "default"
        },
        {
            selector: '.lsm-createAssignment-done.selected'
        }
    ];
    var recipe = window.recipe.MultipleSelectionCreateRecipe = new window.recipe.Recipe(steps, id);
    recipe.start = function (params) {
        return $.Deferred().resolve();
    };
})();
