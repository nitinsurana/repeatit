(function () {
    'use strict';
    
	var id = "AddClassicQuestionToAssessmentRecipe";
    var steps = [
        {
            selector: '.ls-ins-browse-icon',
            action: 'click'
        },
				{
            selector: '#ls-ins-all-question-types .ui-dropdownchecklist',
            action: 'click'
        },
				{
            selector: '.ui-dropdownchecklist-item input[index=0]',
            action: 'click'
        },
				{
            selector: '',
            action: 'click'
        },
				{
            selector: '.ui-dropdownchecklist-done',
            action: 'click'
        },
				{
            selector: '.ls-ins-browse-go',
            action: 'click'
        }
    ];
    var recipe = window.recipe.AddClassicQuestiontoAssignmentLSRecipe = new window.recipe.Recipe(steps,id);
		recipe.start = function (params) {
				this.steps[3].selector = '.ui-dropdownchecklist-item input[value="' + params.self.qtype + '"]';
        return $.Deferred().resolve();
    };
})();
