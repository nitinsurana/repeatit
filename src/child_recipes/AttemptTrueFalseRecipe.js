(function () {
	"use strict";
	var id = "AttemptTrueFalseRecipe";
    var steps = [
        {
            selector: '.true-false-student-answer-select:eq(0)',
            action: 'click'
        },
    ];

    var recipe = window.recipe.AttemptTrueFalseRecipe = new window.recipe.Recipe(steps,id);
    recipe.start = function (params) {
        var defer = $.Deferred();
        if ($(this.steps[0].selector).length === 0) {
            var msg = "Please make sure to be in true/false question authoring view before using this recipe";
            defer.reject(msg);
        } else {
            defer.resolve();
        }
        var answerIndex = Math.round(Math.random());
        this.steps[0].selector = '.true-false-student-answer-select:eq(' + answerIndex + ')';
        return defer.promise();
    };
})();
