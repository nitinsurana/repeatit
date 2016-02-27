(function () {
	"use strict";
	var id = "AttemptTextDropdownRecipe";
    var steps = [
        {
            selector: '.question-raw-content-dropdown',
            action: function(){
				var numOfOptions = $(this).find('option').length;
				var randomGuess = Math.ceil(numOfOptions * Math.random());
				randomGuess = randomGuess === numOfOptions ? randomGuess - 1 : randomGuess;
				$(this).find('option:eq('+randomGuess+')').attr('selected',true);
			} 
        },
    ];
    var recipe = window.recipe.AttemptTextDropdownRecipe = new window.recipe.Recipe(steps,id);
    recipe.start = function () {
        var defer = $.Deferred();
        if ($(this.steps[0].selector).length === 0) {
            var msg = "Please make sure to be in TextDropDown question attempt view before using this recipe";
            defer.reject(msg);
        } else {
            defer.resolve();
        }
        return defer.promise();
    };
})();
