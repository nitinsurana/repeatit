(function () {
    'use strict';

	var id = "LoginGliderRecipe";
    var steps = [
        {
            selector: '#at-field-email',
            action: 'input'
        },
        {
            selector: '#at-field-password',
            action: 'input'
        },
        {
            selector: '.btn-steplr-submit'
        }
    ];
    var recipe = window.recipe.LoginGliderRecipe = new window.recipe.Recipe(steps,id);
    recipe.start = function (params) {
        this.steps[0].value = params.email;
        this.steps[1].value = params.password;
        return $.Deferred().resolve();
    };
})();
