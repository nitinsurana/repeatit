(function () {
    var steps = [
        {
            type: 'recipe',
            recipeId: '',
            params: {}
        }
    ];
    var recipe = window.recipe.FillClassicQuestionRecipe = new window.recipe.Recipe(steps);
    recipe.start = function (params) {
        var defer = $.Deferred(),
            recipeId,
            qtype = parseInt($("#questionType").val());
        if (window.isNaN(qtype)) {
            var msg = "Looks like you are not on any Classic Question authoring screen";
            return defer.reject(msg);
        } else {
            switch (qtype) {
                case 120:
                    recipeId = 'FillTrueFalseRecipe';
                    break;
                case 125:
                    recipeId = 'FillTextEntryRecipe';
                    break;
                case 123:
                    recipeId = 'FillEssayRecipe';
                    break;
                case 129:
                    recipeId = 'FillTextDropdownRecipe';
                    break;
                case 122:
                    recipeId = 'FillMultipleSelectionRecipe';
                    break;
                case 116:
                    recipeId = 'FillMultipleChoiceRecipe';
                    break;
            }
            this.steps[0].recipeId = recipeId;
            this.steps[0].params = params[recipeId][params.self.content];
        }
        return defer.resolve();
    }
})();