(function () {
    'use strict';
	var id = "CreateLSAssignmentRecipe";
    var steps = [
        {
            selector: '.ls-dashboard-new-assignment, #new-assignment-button',
            action: 'click'
        },
        {
            selector: '',
            action: 'click'
        }
    ];
    var recipe = window.recipe.CreateLSAssignmentRecipe = new window.recipe.Recipe(steps,id);
    recipe.start = function (params) {
        this.steps[1].selector = params.selector;
        return $.Deferred().resolve();
    };
})();
