(function () {
    var steps = [
        {
            type: 'recipe',
            recipeId: 'CreateAssessmentRecipe'
        },
        {
            type: 'recipe',
            recipeId: 'OpenTFRecipe'
        },
        {
            type: 'recipe',
            recipeId: 'FillTrueFalseRecipe',
            params: {
                questionTitle: 'Creating Normal True False {datetime}'
            }
        }
    ];
    window.recipe.TrueFalseCreateRecipe = new window.recipe.Recipe(steps);
})();