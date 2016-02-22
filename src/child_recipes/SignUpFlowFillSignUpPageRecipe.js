(function(){
  'use strict';

  var steps = [
    {
      selector: '#at-field-fullname',
      action: "input"
    },
    {
      selector: '#at-field-mobile',
      action: "input"
    },
    {
      selector: '#at-field-email',
      action: "input"
    },
    {
      selector: '#at-field-password',
      action: "input"
    },
    {
      selector: '#at-field-terms'
    },
    {
      selector: '#signup-button'
    }
  ];

  var recipe = window.recipe.SignUpFlowFillSignUpPageRecipe = new window.recipe.Recipe(steps);
  recipe.start = function (params) {
    this.steps[0].value = params.name;
    this.steps[1].value = params.phone;
    this.steps[2].value = params.email;
    this.steps[3].value = params.password;
    return $.Deferred().resolve();
  };
})();