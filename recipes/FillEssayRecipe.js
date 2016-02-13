(function () {
    var steps = [
        {
            selector: '#question-raw-content',
            action: 'redactor'
        },
        {
            type: 'recipe',
            recipeId: 'FillSolutionHintRecipe',
            params: {
                solution: "This is sample solution",
                hint: "This is sample hint"
            }
        },
        {
            selector: '#saveQuestionDetails1',
            action: 'click'
        }
    ];

    var recipe = window.recipe.FillEssayRecipe = new window.recipe.Recipe(steps);
    recipe.start = function (params) {
        this.steps[0].value = params.questionTitle;
    }
})();
