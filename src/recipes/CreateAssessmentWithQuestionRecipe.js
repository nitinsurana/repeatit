(function () {
    var steps = [
        {
            type: 'recipe',
            recipeId: '',
            params: {
                assessment: true
            }
        }
    ];
    var recipe = window.recipe.CreateAssessmentWithClassicQuestionRecipe = new window.recipe.Recipe(steps);
    recipe.start = function (params) {
        switch (params.self.qtype) {
            case 120:
                this.steps[0].recipeId = 'TrueFalseCreateRecipe';
                break;
            case 125:
                this.steps[0].recipeId = 'TextEntryCreateRecipe';
                break;
            case 123:
                this.steps[0].recipeId = 'EssayCreateRecipe';
                break;
            case 129:
                this.steps[0].recipeId = 'TextDropdownCreateRecipe';
                break;
            case 122:
                this.steps[0].recipeId = 'MultipleSelectionCreateRecipe';
                break;
            case 116:
                this.steps[0].recipeId = 'MultipleChoiceCreateRecipe';
                break;
        }
        return $.Deferred().resolve();
    }
})();