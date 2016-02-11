(function () {
    var steps = [
        {
            selector: '#create-assessment-with-val'
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
            action: function () {
                $(this).redactor('set', 'something random');
            }
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
            selector: 'span.lsm-create-btn:visible',
            action: 'click'
        },
        {
            selector: '#qtn-true-false-type',
            action: 'click'
        },
        {
            selector: '#question-raw-content',
            action: function () {
                $(this).redactor('set', 'p0');
            }
        },
        {
            selector: '.true-false-answer-select:eq(0)',
            action: 'click'
        },
        {
            selector: '#saveQuestionDetails1',
            action: 'click'
        },
        {
            selector: '.as-question-editor-back'
        },
        {
            selector: '.add-question[style]',
            action: 'click'
        },
        {
            selector: 'span.lsm-create-btn:visible',
            action: 'click'
        },
        {
            selector: '#qtn-true-false-type',
            action: 'click'
        },
        {
            selector: '#question-raw-content',
            action: function () {
                $(this).redactor('set', 'p1');
            }
        },
        {
            selector: '.true-false-answer-select:eq(1)',
            action: 'click'
        },
        {
            selector: '#saveQuestionDetails1',
            action: 'click'
        },
        {
            selector: '.as-question-editor-back'
        },
        {
            selector: '.add-question[style]',
            action: 'click'
        },
        {
            selector: 'span.lsm-create-btn:visible',
            action: 'click'
        },
        {
            selector: '#qtn-true-false-type',
            action: 'click'
        },
        {
            selector: '#question-raw-content',
            action: function () {
                $(this).redactor('set', 'p2');
            }
        },
        {
            selector: '.true-false-answer-select:eq(0)',
            action: 'click'
        },
        {
            selector: '#saveQuestionDetails1',
            action: 'click'
        },
        {
            selector: '.as-question-editor-back'
        }
    ];

    var PassageCreateRecipe = window.recipe.PassageCreateRecipe = new window.recipe.Recipe(steps);

    PassageCreateRecipe.start = function () {
        Backbone.history.loadUrl('#createAssessment/close?cm=assessment');
    };
})();
