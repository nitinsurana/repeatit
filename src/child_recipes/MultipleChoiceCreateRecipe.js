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
                qtype: 116
            }
        },
        {
            type: 'recipe',
            recipeId: 'FillMultipleChoiceRecipe',
            params: {
                questionTitle: 'Creating Multiple Choice Question {datetime}'
            }
        },
        {
            selector: '.lsm-createAssignment-done.selected'
        }
    ];
    window.recipe.MultipleChoiceCreateRecipe = new window.recipe.Recipe(steps);
})();