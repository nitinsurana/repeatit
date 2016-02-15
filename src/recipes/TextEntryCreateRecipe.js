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
                qtype: 125
            }
        },
        {
            type: 'recipe',
            recipeId: 'FillTextEntryRecipe',
            params: {
                questionTitle: 'Creating Normal Text Entry Question - {datetime}'
            }
        }
    ];
    window.recipe.TextEntryCreateRecipe = new window.recipe.Recipe(steps);
})();