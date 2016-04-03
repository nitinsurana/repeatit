(function () {
    'use strict';
	var id = "CreateAssessmentWithClassicQuestionRecipe";
    var steps = [
        {
            type: 'recipe',
            _id: '',
            params: {
                assessment: true
            }
        }
    ];
    var recipe = window.recipe.CreateAssessmentWithClassicQuestionRecipe = new window.recipe.Recipe(steps,id);
    recipe.start = function (params) {
        switch (params.self.qtype) {
            case 120:
                this.steps[0]._id = 'TrueFalseCreateRecipe';
                break;
            case 125:
                this.steps[0]._id = 'TextEntryCreateRecipe';
                break;
            case 123:
                this.steps[0]._id = 'EssayCreateRecipe';
                break;
            case 129:
                this.steps[0]._id = 'TextDropdownCreateRecipe';
                break;
            case 122:
                this.steps[0]._id = 'MultipleSelectionCreateRecipe';
                break;
            case 116:
                this.steps[0]._id = 'MultipleChoiceCreateRecipe';
                break;
        }
        return $.Deferred().resolve();
    };
})();
