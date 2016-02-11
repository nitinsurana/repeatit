(function () {
    var steps = [
        {
            selector: '#create-assessment-with-val'
        }
    ];
    var recipe = window.recipe.CreateAssessmentRecipe = new window.recipe.Recipe(steps);
    recipe.start = function () {
        var url = '#createAssessment/close?cm=assessment';
        Backbone.history.navigate(url);
        Backbone.history.loadUrl(url);
    }
})();