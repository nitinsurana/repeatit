(function () {
    'use strict';
    var id = "FillMultipleSelectionRecipe";
    var steps = [
        {
            selector: '#question-ms-raw-content',
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
            selector: '.multiple-select-choice-icon:eq(1)'
        },
        {       //6
            selector: '.multiple-select-choice-icon:eq(1)'
        },
        {
            type: 'recipe',
            _id: 'FillSolutionHintRecipe',
            pSet: "default"
        },
        {
            selector: '#saveQuestionDetails1',
            action: 'click'
        }
    ];

    var recipe = window.recipe.FillMultipleSelectionRecipe = new window.recipe.Recipe(steps, id);
    recipe.start = function (params) {
        this.steps[0].value = params.questionTitle;

        var answerIndex = Math.round(Math.random());        //0,1   -   Select 2 correct answers
        this.steps[5].selector = '.multiple-select-choice-icon:eq(' + answerIndex + ')';
        this.steps[6].selector = '.multiple-select-choice-icon:eq(' + (2 + answerIndex) + ')';
        return $.Deferred().resolve();
    };
})();
