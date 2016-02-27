
(function () {
	"use strict";
	var id = "AttemptMultipleChoiceRecipe";
    var steps = [
        {
            selector: '.single-select-choice-icon-preview',
            action: function(){
				var numOfOptions = $(this).length;
				var randomGuess = Math.floor(Math.random() * numOfOptions);
				$(this).eq(randomGuess).click();
			} 
        },
    ];
    var recipe = window.recipe.AttemptMultipleChoiceRecipe = new window.recipe.Recipe(steps,id);
    recipe.start = function () {
        var defer = $.Deferred();
        if ($(this.steps[0].selector).length === 0) {
            var msg = "Please make sure to be in MultipleChoice question attempt view before using this recipe";
            defer.reject(msg);
        } else {
            defer.resolve();
        }
        return defer.promise();
    };
})();
