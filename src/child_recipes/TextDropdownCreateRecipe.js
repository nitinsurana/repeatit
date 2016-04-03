(function () {
    'use strict';
    var id = "TextDropdownCreateRecipe";
    var steps = [
        {
            type: 'recipe',
            _id: 'OpenQuestionAuthoringRecipe',
            pSet: "tdd"
        },
        {
            type: 'recipe',
            _id: 'FillTextDropdownRecipe',
            pSet: "default"
        },
        {
            selector: '.lsm-createAssignment-done.selected'
        }
    ];
    var recipe = window.recipe.TextDropdownCreateRecipe = new window.recipe.Recipe(steps, id);
    recipe.start = function (params) {
        return $.Deferred().resolve();
    };
})();
