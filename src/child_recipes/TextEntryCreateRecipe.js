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
                qtype: 125
            }
        },
        {
            type: 'recipe',
            recipeId: 'FillTextEntryRecipe',
            params: {
                questionTitle: 'Creating Normal Text Entry Question - {datetime}'
            }
        },
        {
            selector: '.lsm-createAssignment-done.selected'
        }
    ];
    var recipe = window.recipe.TextEntryCreateRecipe = new window.recipe.Recipe(steps);
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