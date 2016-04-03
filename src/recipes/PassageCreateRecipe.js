(function () {
    'use strict';

    var id = "PassageCreateRecipe";
    var steps = [
        {
            type: 'recipe',
            _id: 'CreateAssessmentRecipe'
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
            _id: 'OpenQuestionAuthoringRecipe',
            pSet: "tf"
        },
        {
            type: 'recipe',
            _id: 'FillTrueFalseRecipe',
            pSet: "default"
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
            _id: 'OpenQuestionAuthoringRecipe',
            pSet: "tf"
        },
        {
            type: 'recipe',
            _id: 'FillTrueFalseRecipe',
            pSet: "default"
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
            _id: 'OpenQuestionAuthoringRecipe',
            pSet: "tf"
        },
        {
            type: 'recipe',
            _id: 'FillTrueFalseRecipe',
            pSet: "default"
        },
        {
            selector: '.as-question-editor-back'
        }
    ];

    var recipe = window.recipe.PassageCreateRecipe = new window.recipe.Recipe(steps, id);
})();
