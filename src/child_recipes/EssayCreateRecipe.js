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
                qtype: 123
            }
        },
        {
            type: 'recipe',
            recipeId: 'FillEssayRecipe',
            params: {
                questionTitle: 'Creating Essay Question - {datetime}'
            }
        },
        {
            selector: '.lsm-createAssignment-done.selected'
        }
    ];
    window.recipe.EssayCreateRecipe = new window.recipe.Recipe(steps);
})();