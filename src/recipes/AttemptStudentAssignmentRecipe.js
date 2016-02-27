(function () {
	"use strict";
	var id = "AttemptAssignmentRecipe";
    var steps = [
        {
            type: 'recipe',
            recipeId: 'AttemptAssignmentRecipe',
            params: {}
        }
    ];
    var recipe = window.recipe.AttemptStudentAssignmentRecipe = new window.recipe.Recipe(steps,id);
    recipe.start = function () {
		var selectorFound = false;
		var questionTypeSelectorMap = {
			'.true-false-student-answer-select' : 120,
			'.text-entry-question-preview' : 125,
			'.essay-question-preview' : 123,
			'.text-drop-down' : 129,
			'.multiple-select' : 122,
			'.multiple-choice' : 116

		};
		for(var selector in questionTypeSelectorMap){
			if(questionTypeSelectorMap.hasOwnProperty(selector)){
				if($(selector).length){
					this.steps[0].params.qtype = questionTypeSelectorMap[selector];
					selectorFound = true;
					break;
				}
			}
		}
		if(!selectorFound){
				this.steps[0].params.qtype = 0 ;
		}
		return $.Deferred().resolve(); 

    };
	recipe.stop = function(){
		var self = this;
		var promise = $.Deferred();
		var clear = window.setInterval(function(){
			if(!$.active){
				if(!$('.as-review-confirmation').length){
					// self.start();
					window.recipe.RecipePlayer(self,{});
				}
				promise.resolve();
				window.clearTimeout(clear);
			}
		},500);
		return promise;
	};
})();
