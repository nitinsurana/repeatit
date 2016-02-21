(function () {
	"use strict";
    var steps = [
        {
            type: 'recipe',
            recipeId: '',
            params: {}
        },
		{
			selector: '#as-take-next-question',
			action : 'click'
		}
    ];
    var recipe = window.recipe.AttemptAssignmentRecipe = new window.recipe.Recipe(steps);
    recipe.start = function (params) {
        switch (params.qtype) {
			case 0 :
				this.steps = this.steps.slice(1);
				break;
            case 120:
                this.steps[0].recipeId = 'AttemptTrueFalseRecipe';
                break;
            case 125:
                this.steps[0].recipeId = 'AttemptTextEntryRecipe';
                break;
            case 123:
                this.steps[0].recipeId = 'AttemptEssayRecipe';
                break;
            case 129:
                this.steps[0].recipeId = 'AttemptTextDropdownRecipe';
                break;
            case 122:
                this.steps[0].recipeId = 'AttemptMultipleSelectRecipe';
                break;
            case 116:
                this.steps[0].recipeId = 'AttemptMultipleChoiceRecipe';
                break;
        }
        return $.Deferred().resolve();
    };
})();
