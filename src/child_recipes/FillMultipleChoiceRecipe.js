(function () {
    var steps = [
        {
            selector: '#question-mc-raw-content',
            action: 'redactor'
        },
        {
            selector: '.redactor-answer-container:eq(0)',
            action: 'redactor',
            value: 'Choice 1'
        },
        {
            selector: '.redactor-answer-container:eq(1)',
            action: 'redactor',
            value: 'Choice 2'
        },
        {
            selector: '.redactor-answer-container:eq(2)',
            action: 'redactor',
            value: 'Choice 3'
        },
        {
            selector: '.redactor-answer-container:eq(3)',
            action: 'redactor',
            value: 'Choice 4'
        },
        {       //5
            selector: '.single-select-choice-icon:eq(1)'
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

    var recipe = window.recipe.FillMultipleChoiceRecipe = new window.recipe.Recipe(steps);
    recipe.start = function (params) {
        this.steps[0].value = params.questionTitle;

        var answerIndex = Math.round(Math.random() * 3);
        this.steps[5].selector = '.single-select-choice-icon:eq(' + answerIndex + ')';
        return $.Deferred().resolve();
    }
})();
