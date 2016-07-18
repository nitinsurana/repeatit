(function () {
    'use strict';
 	var id = "LoginLSRecipe";
    var steps = [
        {
            selector: '#username',
            action: 'input'
        },
        {
            selector: '#password',
            action: 'input'
        },
        {
            selector: '#loginSubmitBtn'
        }
    ];
    var recipe = window.recipe.LoginLSRecipe = new window.recipe.Recipe(steps,id);
    recipe.start = function (params) {
        this.steps[0].value = params.email;
        this.steps[1].value = params.password;
        return $.Deferred().resolve();
    };
})();
