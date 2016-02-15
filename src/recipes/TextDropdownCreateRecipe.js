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
                qtype: 129
            }
        },
        {
            type: 'recipe',
            recipeId: 'FillTextDropdownRecipe',
            params: {
                questionTitle: 'Creating Text Dropdown Question - {datetime}'
            }
        }
    ];
    window.recipe.TextDropdownCreateRecipe = new window.recipe.Recipe(steps);
})();