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
        //params will be object if injected in another extension as a step, else it'll be an encoded string passed by extension_script (popup.js)
        params = typeof params !== 'object' ? JSON.parse(window.decodeURIComponent(params)) : params;
        this.steps[0].value = params.questionTitle;

        var answerIndex = Math.round(Math.random());
        this.steps[1].selector = '.true-false-answer-select:eq(' + answerIndex + ')';
    }
})();
