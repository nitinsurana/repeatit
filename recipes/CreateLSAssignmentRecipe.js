(function () {
    var steps = [
        {
            selector: '.ls-dashboard-new-assignment',
            action: 'click'
        },
        {
            selector: '',
            action: 'click'
        }
    ];
    var recipe = window.recipe.CreateLSAssignmentRecipe = new window.recipe.Recipe(steps);
    recipe.start = function (params) {
        this.steps[1].selector = params.self.selector;
        return $.Deferred().resolve();
    }
})();