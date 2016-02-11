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
            recipeId: 'FillTrueFalseRecipe'
        }
    ];
    window.recipe.TrueFalseCreateRecipe = new window.recipe.Recipe(steps);
})();