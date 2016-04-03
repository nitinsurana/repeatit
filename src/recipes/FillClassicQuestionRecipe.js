(function () {
    'use strict';
    var id = "FillClassicQuestionRecipe";
    var steps = [
        {
            type: 'recipe',
            _id: '',
            pSet: "default"
        }
    ];
    var recipe = window.recipe.FillClassicQuestionRecipe = new window.recipe.Recipe(steps, id);
    recipe.start = function (params) {
        var defer = $.Deferred(),
            _id,
            qtype = parseInt($("#questionType").val());
        if (window.isNaN(qtype)) {
            var msg = "Looks like you are not on any Classic Question authoring screen";
            return defer.reject(msg);
        } else {
            switch (qtype) {
                case 120:
                    _id = 'FillTrueFalseRecipe';
                    break;
                case 125:
                    _id = 'FillTextEntryRecipe';
                    break;
                case 123:
                    _id = 'FillEssayRecipe';
                    break;
                case 129:
                    _id = 'FillTextDropdownRecipe';
                    break;
                case 122:
                    _id = 'FillMultipleSelectionRecipe';
                    break;
                case 116:
                    _id = 'FillMultipleChoiceRecipe';
                    break;
            }
            this.steps[0]._id = _id;
            this.steps[0].pSet = params.content;
        }
        return defer.resolve();
    };
})();
