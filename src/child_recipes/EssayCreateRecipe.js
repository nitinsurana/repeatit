(function () {
    'use strict';
    var id = "EssayCreateRecipe";
    var steps = [
        {
            type: 'recipe',
            _id: 'OpenQuestionAuthoringRecipe',
            pSet: "es",
        },
        {
            type: 'recipe',
            _id: 'FillEssayRecipe',
            pSet: "default"
        },
        {
            selector: '.lsm-createAssignment-done.selected'
        }
    ];
    var recipe = window.recipe.EssayCreateRecipe = new window.recipe.Recipe(steps, id);
    recipe.start = function (params) {
        return $.Deferred().resolve();
    };
})();
