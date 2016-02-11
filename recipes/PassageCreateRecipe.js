(function () {
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
            value: 'something random'
        },
        {
            selector: '.tab-title-text',
            action: function () {
                $(this).html('title...');
            }
        },
        {
            selector: '#question-edit-passage-text',
            action: function () {
                $(this).redactor('set', 'something random');
            }
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
            recipeId: 'OpenTFRecipe'
        },
        {
            type: 'recipe',
            recipeId: 'FillTrueFalseRecipe',
            params: {
                questionTitle: 'p0'
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
            recipeId: 'OpenTFRecipe'
        },
        {
            type: 'recipe',
            recipeId: 'FillTrueFalseRecipe',
            params: {
                questionTitle: 'p1'
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
            recipeId: 'OpenTFRecipe'
        },
        {
            type: 'recipe',
            recipeId: 'FillTrueFalseRecipe',
            params: {
                questionTitle: 'p2'
            }
        },
        {
            selector: '.as-question-editor-back'
        }
    ];

    var recipe = window.recipe.PassageCreateRecipe = new window.recipe.Recipe(steps);
})();
