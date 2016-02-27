(function () {
    'use strict';
	var id = "AddClassicQuestionToAssessmentRecipe";
    var steps = [
        {
            selector: '#assessments-back-button'
        },
        {
            type: 'recipe',
            recipeId: '',
            params: {
                assessment: false
            }
        }
    ];
    var recipe = window.recipe.AddClassicQuestionToAssessmentRecipe = new window.recipe.Recipe(steps,id);
    recipe.start = function (params) {
        switch (params.self.qtype) {
            case 120:
                this.steps[1].recipeId = 'TrueFalseCreateRecipe';
                break;
            case 125:
                this.steps[1].recipeId = 'TextEntryCreateRecipe';
                break;
            case 123:
                this.steps[1].recipeId = 'EssayCreateRecipe';
                break;
            case 129:
                this.steps[1].recipeId = 'TextDropdownCreateRecipe';
                break;
            case 122:
                this.steps[1].recipeId = 'MultipleSelectionCreateRecipe';
                break;
            case 116:
                this.steps[1].recipeId = 'MultipleChoiceCreateRecipe';
                break;
        }
        return $.Deferred().resolve();
    };
})();
