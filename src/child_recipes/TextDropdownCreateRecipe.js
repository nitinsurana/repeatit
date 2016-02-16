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
        },
        {
            selector: '.lsm-createAssignment-done.selected'
        }
    ];
    window.recipe.TextDropdownCreateRecipe = new window.recipe.Recipe(steps);
})();