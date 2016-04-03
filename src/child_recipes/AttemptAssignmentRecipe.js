(function () {
    "use strict";
    var id = "AttemptAssignmentRecipe";
    var steps = [
        {
            type: 'recipe',
            _id: '',
            pSet: ""
        },
        {
            selector: '#as-take-next-question',
            action: 'click'
        }
    ];
    var recipe = window.recipe.AttemptAssignmentRecipe = new window.recipe.Recipe(steps, id);
    recipe.start = function (params) {
        switch (params.qtype) {
            case 0 :
                this.steps = this.steps.slice(1);
                break;
            case 120:
                this.steps[0]._id = 'AttemptTrueFalseRecipe';
                break;
            case 125:
                this.steps[0]._id = 'AttemptTextEntryRecipe';
                break;
            case 123:
                this.steps[0]._id = 'AttemptEssayRecipe';
                break;
            case 129:
                this.steps[0]._id = 'AttemptTextDropdownRecipe';
                break;
            case 122:
                this.steps[0]._id = 'AttemptMultipleSelectRecipe';
                break;
            case 116:
                this.steps[0]._id = 'AttemptMultipleChoiceRecipe';
                break;
        }
        return $.Deferred().resolve();
    };
})();
