(function () {
    'use strict';
	var id = "AddQuestionToPassageRecipe";
    var steps = [
		{
			selector: '.add-question'
		}
    ];
    var recipe = window.recipe.AddQuestionToPassageRecipe = new window.recipe.Recipe(steps,id);
    recipe.start = function () {
        return $.Deferred().resolve();
    };
})();
