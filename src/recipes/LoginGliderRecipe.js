(function () {
    'use strict';

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
    var recipe = window.recipe.LoginGliderRecipe = new window.recipe.Recipe(steps);
    recipe.start = function (params) {
        this.steps[0].value = params.self.email;
        this.steps[1].value = params.self.password;
        return $.Deferred().resolve();
    };
})();