(function () {
    'use strict';
	var id = "EssayCreateRecipe";
    var steps = [
        {
            type: 'wait',
            seconds: 2
        },
        {
            type: 'recipe',
            recipeId: 'OpenQuestionAuthoringRecipe',
            params: {
                qtype: 123
            }
        },
        {
            type: 'recipe',
            recipeId: 'FillEssayRecipe',
            params: {
                questionTitle: 'Creating Essay Question - {datetime}'
            }
        },
        {
            selector: '.lsm-createAssignment-done.selected'
        }
    ];
    var recipe = window.recipe.EssayCreateRecipe = new window.recipe.Recipe(steps,id);
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
