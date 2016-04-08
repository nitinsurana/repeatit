(function () {
    'use strict';
    var id = "AddClassicQuestionToAssessmentRecipe";
    var steps = [
        {
            selector: '#assessments-back-button'
        },
        {
            type: 'recipe',
            _id: '',
            pSet: ""
        }
    ];
    var recipe = window.recipe.AddClassicQuestionToAssessmentRecipe = new window.recipe.Recipe(steps, id);
    recipe.start = function (params) {
        if ($("#question-passage-based-right-section .add-question[style]").length) {
            this.steps[0]._id = "AddQuestionToPassageRecipe";
            this.steps[0].type = "recipe";
            delete this.steps[0].selector;
        } else {
            this.steps[0].selector = "#assessments-back-button";
            delete this.steps[0]._id;
            delete this.steps[0].type;
        }
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
