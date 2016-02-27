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
            recipeId: 'OpenQuestionAuthoringRecipe',
            params: {
                qtype: 116
            }
        },
        {
            type: 'recipe',
            recipeId: 'FillMultipleChoiceRecipe',
            params: {
                questionTitle: 'Creating Multiple Choice Question {datetime}'
            }
        },
        {
            selector: '.lsm-createAssignment-done.selected'
        }
    ];
    var recipe = window.recipe.MultipleChoiceCreateRecipe = new window.recipe.Recipe(steps,id);
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
