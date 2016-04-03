(function () {
    'use strict';
    var id = "TextEntryCreateRecipe";
    var steps = [
        {
            type: 'recipe',
            _id: 'OpenQuestionAuthoringRecipe',
            pSet: "te"
        },
        {
            type: 'recipe',
            _id: 'FillTextEntryRecipe',
            pSet: "default"
        },
        {
            selector: '.lsm-createAssignment-done.selected'
        }
    ];
    var recipe = window.recipe.TextEntryCreateRecipe = new window.recipe.Recipe(steps, id);
    recipe.start = function (params) {
        return $.Deferred().resolve();
    };
})();
