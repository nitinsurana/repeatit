(function () {
    var steps = [
        {
            selector: '#question-raw-content',
            action: function () {
                $(this).redactor('set', 'Filling T/F question');
            }
        }
    ];

    var recipe = window.recipe.FillTrueFalseRecipe = new window.recipe.Recipe(steps);
    recipe.start = function () {
        Backbone.history.loadUrl('#createAssessment/close?cm=assessment');
    };
})();
