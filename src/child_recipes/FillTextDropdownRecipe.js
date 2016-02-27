(function () {
    'use strict';
	var id = "FillTextDropdownRecipe";
    var steps = [
        {
            selector: '#question-raw-content',
            action: 'redactorInsert'
        },
        {
            selector: '.text-drop-val:eq(0)'
        },
        {
            selector: '.text-drop-down-input:eq(0)',
            action: function () {
                this.val('Choice 1').trigger('focusout');
            }
        },
        {
            selector: '.text-drop-val:eq(1)'
        },
        {
            selector: '.text-drop-down-input:eq(1)',
            action: function () {
                this.val('Choice 2').trigger('focusout');
            }
        },
        {
            selector: '.text-drop-val:eq(2)'
        },
        {
            selector: '.text-drop-down-input:eq(2)',
            action: function () {
                this.val('Choice 3').trigger('focusout');
            }
        },
        {       //7
            selector: '.text-drop-val:eq(2)'
        },
        {           //8
            selector: '.select-icon-text-drop-down:eq(1)'
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

    var recipe = window.recipe.FillTextDropdownRecipe = new window.recipe.Recipe(steps,id);
    recipe.start = function (params) {
        this.steps[0].value = params.questionTitle;

        var answerIndex = Math.round(Math.random());
        this.steps[7].selector = '.text-drop-val:eq(' + answerIndex + ')';
        this.steps[8].selector = '.select-icon-text-drop-down:eq(' + answerIndex + ')';
        return $.Deferred().resolve();
    };
})();
