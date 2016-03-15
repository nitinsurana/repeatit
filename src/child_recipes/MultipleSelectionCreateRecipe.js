(function () {
    'use strict';
	var id = "MultipleSelectionCreateRecipe";
    var steps = [
        {
            type: 'wait',
            seconds: 2
        },
        {
            type: 'recipe',
            recipeId: 'OpenQuestionAuthoringRecipe',
            params: {
                qtype: 122
            }
        },
        {
            type: 'recipe',
            recipeId: 'FillMultipleSelectionRecipe',
            params: {
                questionTitle: 'Creating Multiple Selection Question {datetime}'
            }
        },
        {
            selector: '.lsm-createAssignment-done.selected'
        }
    ];
    var recipe = window.recipe.MultipleSelectionCreateRecipe = new window.recipe.Recipe(steps,id);
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