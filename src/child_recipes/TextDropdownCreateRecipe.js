(function () {
    var steps = [
        {
            type: 'wait',
            seconds: 2
        },
        {
            type: 'recipe',
            recipeId: 'OpenQuestionAuthoringRecipe',
            params: {
                qtype: 129
            }
        },
        {
            type: 'recipe',
            recipeId: 'FillTextDropdownRecipe',
            params: {
                questionTitle: 'Creating Text Dropdown Question - {datetime}'
            }
        },
        {
            selector: '.lsm-createAssignment-done.selected'
        }
    ];
    var recipe = window.recipe.TextDropdownCreateRecipe = new window.recipe.Recipe(steps);
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
            }
        }
        return $.Deferred().resolve();
    }
})();