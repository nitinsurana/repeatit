(function(){
  'use strict';

  var id = "GliderFillCompanyDescriptionRecipe";
  var steps = [
    {
      type: 'recipe',
      recipeId: "GliderFindIndustryRecipe"
    },
    {
      selector: 'textarea[name=empPitch]',
      action: 'input'
    },
    {
      selector: "input[name='empOfficeAddress.street']",
      action: 'input'
    },
    {
      selector: "input[name='empOfficeAddress.suite']",
      action: 'input'
    },
    {
      selector: "input[name='empOfficeAddress.zip']",
      action: 'input'
    },
    {
      selector: "input[name='empPhone']",
      action: 'input'
    },
    {
      selector: "input[name='empWebsite']",
      action: 'input'
    },
    {
      selector: "input[name='empInvest']",
      action: 'input'
    },
    {
      selector: ".save-btn"
    }
  ];

  var recipe = window.recipe.GliderFillCompanyDescriptionRecipe = new window.recipe.Recipe(steps,id);
  recipe.start = function (params) {
    this.steps[1].value = params.self.oneLinePitch;
    this.steps[2].value = params.self.oAStreet;
    this.steps[3].value = params.self.oASuite;
    this.steps[4].value = params.self.oAZipCode;
    this.steps[5].value = params.self.phone;
    this.steps[6].value = params.self.website;
    this.steps[7].value = params.self.invest;
    return $.Deferred().resolve();
  };
})();