(function () {
	"use strict";
    var steps = [
        {
            selector: '#html-editor-non-draggable',
            action: 'redactor' ,
			value : "something"
        },
    ];
    var recipe = window.recipe.AttemptEssayRecipe = new window.recipe.Recipe(steps);
    recipe.start = function (params) {
        var defer = $.Deferred();
        if ($(this.steps[0].selector).length === 0) {
            var msg = "Please make sure to be in Essay question attempt view before using this recipe";
            defer.reject(msg);
        } else {
            defer.resolve();
        }
		if(params.value){
			this.steps[0].value = params.value;
		}
        return defer.promise();
    };
})();
