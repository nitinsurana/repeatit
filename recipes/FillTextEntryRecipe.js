(function () {
    var steps = [
        {
            selector: '#question-raw-content',
            action: 'redactorInsert'
        },
        {
            selector: '.get-user-entry',
            action: function () {
                this.val('Correct Answer').trigger('keyup')
            },
            value: 'Correct Answer'
        },
        {
            selector: '.accept_answer'
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

    var recipe = window.recipe.FillTextEntryRecipe = new window.recipe.Recipe(steps);
    recipe.start = function (params) {
        this.steps[0].value = params.questionTitle;
    }
})();
