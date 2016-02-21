(function () {
    'use strict';
    var steps = [
        {
            type: 'wait',
            seconds: 2
        },
        {
            type: 'recipe',
            recipeId: 'OpenQuestionAuthoringRecipe',
            params: {
                qtype: 120
            }
        },
        {
            type: 'recipe',
            recipeId: 'FillTrueFalseRecipe',
            params: {
                questionTitle: 'Creating Normal True False {datetime}'
            }
        },
        {
            selector: '.lsm-createAssignment-done.selected'
        }
    ];
    var recipe = window.recipe.TrueFalseCreateRecipe = new window.recipe.Recipe(steps);
    recipe.start = function (params) {
        if (params && params.assessment) {
            this.steps[0] = {
                type: 'recipe',
                recipeId: 'CreateAssessmentRecipe'
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