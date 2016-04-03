(function () {
    'use strict';
    var id = "MultipleChoiceCreateRecipe";
    var steps = [
        {
            type: 'wait',
            seconds: 2
        },
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
