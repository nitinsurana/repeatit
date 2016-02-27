(function () {
    'use strict';

	var id = "InstructorSignupRecipe";
    var steps = [
        {
            selector: '#first-name',
            action: 'input'
        },
        {
            selector: '#user-email',
            action: 'input'
        },
        {
            selector: '#user-password',
			action: 'input'
        },
        {
            selector: '#retype-password',
			action: 'input'
        },
        {
            selector: '.as-signup-button[mode="teacher"]'
        },
		{
			selector:'.as-add-link'
		},
        {
            selector: '#school-name',
			action: 'input'
        },
        {
            selector: '.reset-district-box',
			action: 'input'
        },
        {
            selector: '#address',
			action: 'input'
        },
        {
            selector: '#city-name',
			action: 'input'
        },
        {
            selector: '#zip-code',
			action: 'input'
        },
        {
            selector: '#state-name',
			action: 'input'
        },
        {
            selector: '.as-add-country-drop-down',
			action: function(){
				var numOfOptions = $(this).find('option').length;
				var randomChoice = Math.floor(Math.random() * (numOfOptions - 1))+1;
				$('option:eq('+randomChoice+')',this).attr('selected',true);
			}
        },
        {
            selector: '.as-add-save-btn',
        },
        {
            selector: '.as-add-subjectArea-dropDown',
			action: function(){
				var numOfOptions = $(this).find('option').length;
				var randomChoice = Math.floor(Math.random() * (numOfOptions - 1))+1;
				$('option:eq('+randomChoice+')',this).attr('selected',true);
				$(this).trigger('change');
			}
        },
        {
            selector: '.as-add-subject-dropDown option:eq(1)',
			action: function(){
				$(this).attr('selected',true);
			}
        },
        {
            selector: '.as-add-grade-dropDown',
			action: function(){
				var numOfOptions = $(this).find('option').length;
				var randomChoice = Math.floor(Math.random() * (numOfOptions-1))+1;
				$('option:eq('+randomChoice+')',this).attr('selected',true);
			}
        },
        {
            selector: '.as-add-save-btn',
        },
        {
            selector: '.as-search-blue-btn',
        }
		
    ];
    var recipe = window.recipe.InstructorSignupRecipe = new window.recipe.Recipe(steps,id);
    recipe.start = function (params) {
		// window.location.href = '/logout';
		window.location.href = '/#register/close/teacher';
		this.steps[0].value = params.self.userName;
        this.steps[1].value = params.self.email;
        this.steps[2].value = params.self.password;
        this.steps[3].value = params.self.password;
        this.steps[6].value = params.self.schoolName;
        this.steps[7].value = params.self.districtName;
        this.steps[8].value = params.self.address;
        this.steps[9].value = params.self.city;
        this.steps[10].value = params.self.zip;
        this.steps[11].value = params.self.state;
		return $.Deferred().resolve();
    };
	recipe.stop = function(){
		// window.location.href = '/#dashboard';
	};
})();
