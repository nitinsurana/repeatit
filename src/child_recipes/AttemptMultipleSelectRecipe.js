(function () {
	"use strict";
	var id = "AttemptMultipleSelectRecipe";
    var steps = [
        {
            selector: '.multiple-select-choice-icon-preview',
            action: function(){
				$(this).filter(function(index){
					return index % 2;
				}).click();
			} 
        },
    ];
    var recipe = window.recipe.AttemptMultipleSelectRecipe = new window.recipe.Recipe(steps,id);
    recipe.start = function () {
        var defer = $.Deferred();
        if ($(this.steps[0].selector).length === 0) {
            var msg = "Please make sure to be in MultipleSelection question attempt view before using this recipe";
            defer.reject(msg);
        } else {
            defer.resolve();
        }
        return defer.promise();
    };
})();
