(function(){
  'use strict';

  var id = "SignUpFlowFillSignUpPageRecipe";
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

  var recipe = window.recipe.SignUpFlowFillSignUpPageRecipe = new window.recipe.Recipe(steps,id);
  recipe.start = function (params) {
    this.steps[0].value = "Himadri";
    this.steps[1].value = "+919800{timeStamp(6)}";
    this.steps[2].value = "himadri.ghosh+{randomString(5)}@snapwiz.com";
    this.steps[3].value = "snapwiz";
    return $.Deferred().resolve();
  };
})();
