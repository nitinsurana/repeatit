(function () {
    'use strict';
    var id = "TextEntryCreateRecipe";
    var steps = [
        {
            type: 'wait',
            seconds: 2
        },
        {
            type: 'recipe',
            _id: 'OpenQuestionAuthoringRecipe',
            pSet: "te"
        },
        {
            type: 'recipe',
            _id: 'FillTextEntryRecipe',
            pSet: "te"
        },
        {
            selector: '.lsm-createAssignment-done.selected'
        }
    ];
    var recipe = window.recipe.TextEntryCreateRecipe = new window.recipe.Recipe(steps, id);
    recipe.start = function (params) {
        if (params && params.assessment) {
            this.steps[0] = {
                type: 'recipe',
                _id: 'CreateAssessmentRecipe'
            };
        } else {
            this.steps[0] = {
                type: 'wait',
                seconds: 2
            };
        }
        return $.Deferred().resolve();
    };
})();
