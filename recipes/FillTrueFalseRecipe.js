(function () {
    var steps = [
        {
            selector: '#question-raw-content',
            action: 'redactor'
        },
        {
            selector: '.true-false-answer-select:eq(0)',
            action: 'click'
        },
        {
            selector: '#saveQuestionDetails1',
            action: 'click'
        }
    ];

    var recipe = window.recipe.FillTrueFalseRecipe = new window.recipe.Recipe(steps);
    recipe.start = function (params) {
        this.steps[0].value = params && params.questionTitle || "Filling T/F";

        var answerIndex = Math.round(Math.random());
        this.steps[1].selector = '.true-false-answer-select:eq(' + answerIndex + ')';
    }
})();
