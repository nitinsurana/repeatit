(function () {
    var steps = [
        {
            selector: '#assessments-use-button'
        },
        {
            selector: ".share-with-wrap label.radio.i-checks:eq(0)"
        },
        {
            selector: '#assign-button'
        }
    ];
    var recipe = window.recipe.AssignAssessmentRecipe = new window.recipe.Recipe(steps);
    recipe.start = function (params) {
        switch (params.self.type) {
            case "right_now":
                this.steps[1].selector = ".share-with-wrap label.radio.i-checks:eq(" + 1 + ")"
                break;
            case "publish_and_use_later":
                this.steps[1].selector = ".share-with-wrap label.radio.i-checks:eq(" + 0 + ")"
                break;
        }
        return $.Deferred().resolve();
    }
})();