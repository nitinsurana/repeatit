(function () {
    var steps = [
        {
            type: 'recipe',
            recipeId: 'CreateAssessmentRecipe'
        },
        {
            type: 'recipe',
            recipeId: 'OpenQuestionAuthoringRecipe',
            params: {
                qtype: 122
            }
        },
        {
            type: 'recipe',
            recipeId: 'FillMultipleSelectionRecipe',
            params: {
                questionTitle: 'Creating Multiple Selection Question {datetime}'
            }
        }
    ];
    window.recipe.MultipleSelectionCreateRecipe = new window.recipe.Recipe(steps);
})();