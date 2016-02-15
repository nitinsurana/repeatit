(function () {
    var steps = [
        {
            selector: 'span.lsm-create-btn:visible:eq(0)'
        },
        {
            selector: '#qtn-true-false-type',
            action: 'click'
        }
    ];
    var recipe = window.recipe.OpenQuestionAuthoringRecipe = new window.recipe.Recipe(steps);
    recipe.start = function (params) {
        var s = '#';
        switch (params.qtype) {
            case 120:
                s += 'qtn-true-false-type';
                break;
            case 125:
                s += 'qtn-text-entry-type';
                break;
            case 123:
                s += 'qtn-essay-type';
                break;
            case 129:
                s += 'qtn-text-drop-down-type';
                break;
            case 122:
                s += 'qtn-multiple-selection-type';
                break;
            case 116:
                s += 'qtn-multiple-choice-type';
                break;
        }
        this.steps[1].selector = s;
        return $.Deferred().resolve();
    }
})();