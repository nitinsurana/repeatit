(function () {
    'use strict';

    var steps = [
        {
            type: 'recipe',
            recipeId: 'CreateAssessmentRecipe'
        },
        {
            selector: 'span.lsm-create-btn:first'
        },
        {
            selector: '#qtn-passage-type',
            wait: 100
        },
        {
            selector: '#passage_title',
            action: 'redactor',
            value: 'Passage Title {datetime}'
        },
        {
            selector: '.tab-title-text',
            action: function () {
                $(this).html('title...');
            }
        },
        {
            selector: '#question-edit-passage-text',
            action: 'redactor',
            value: 'Something Random {datetime}'
        },
        {
            selector: '#saveQuestionDetails1',
            action: 'click'
        },
        {
            selector: '.add-question[style]',
            action: 'click'
        },
        {
            type: 'recipe',
            recipeId: 'OpenQuestionAuthoringRecipe',
            params: {
                qtype: 120
            }
        },
        {
            type: 'recipe',
            recipeId: 'FillTrueFalseRecipe',
            params: {
                questionTitle: 'p0 {datetime}'
            }
        },
        {
            selector: '.as-question-editor-back'
        },
        {
            selector: '.add-question[style]',
            action: 'click'
        },
        {
            type: 'recipe',
            recipeId: 'OpenQuestionAuthoringRecipe',
            params: {
                qtype: 120
            }
        },
        {
            type: 'recipe',
            recipeId: 'FillTrueFalseRecipe',
            params: {
                questionTitle: 'p1 {datetime}'
            }
        },
        {
            selector: '.as-question-editor-back'
        },
        {
            selector: '.add-question[style]',
            action: 'click'
        },
        {
            type: 'recipe',
            recipeId: 'OpenQuestionAuthoringRecipe',
            params: {
                qtype: 120
            }
        },
        {
            type: 'recipe',
            recipeId: 'FillTrueFalseRecipe',
            params: {
                questionTitle: 'p2 {datetime}'
            }
        },
        {
            selector: '.as-question-editor-back'
        }
    ];

    var recipe = window.recipe.PassageCreateRecipe = new window.recipe.Recipe(steps);
})();
