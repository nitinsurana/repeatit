(function () {
    'use strict';
    var id = "CreateAssessmentWithClassicQuestionRecipe";
    var steps = [
        {
            type: 'skip'
        },
        {
            type: 'recipe',
            _id: '',
            pSet: ""
        }
    ];
    var recipe = window.recipe.CreateAssessmentWithClassicQuestionRecipe = new window.recipe.Recipe(steps, id);
    recipe.start = function (params) {
        this.steps[0] = {
            type: 'recipe',
            _id: 'CreateAssessmentRecipe',
            pSet: ""
        };
        switch (params.qtype) {
            case 120:
                this.steps[1]._id = 'TrueFalseCreateRecipe';
                break;
            case 125:
                this.steps[1]._id = 'TextEntryCreateRecipe';
                break;
            case 123:
                this.steps[1]._id = 'EssayCreateRecipe';
                break;
            case 129:
                this.steps[1]._id = 'TextDropdownCreateRecipe';
                break;
            case 122:
                this.steps[1]._id = 'MultipleSelectionCreateRecipe';
                break;
            case 116:
                this.steps[1]._id = 'MultipleChoiceCreateRecipe';
                break;
        }
        return $.Deferred().resolve();
    };
})();
