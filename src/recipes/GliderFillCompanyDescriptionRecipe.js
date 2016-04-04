(function(){
  'use strict';

  var id = "GliderFillCompanyDescriptionRecipe";
  var steps = [
    {
      type: 'recipe',
      _id: "GliderFindIndustryRecipe"
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
      selector: "input[name='empEstMonth']",
      action: 'input'
    },
    {
      selector: ".save-btn"
    }
  ];

  var recipe = window.recipe.GliderFillCompanyDescriptionRecipe = new window.recipe.Recipe(steps,id);
  recipe.start = function (params) {
    this.steps[1].value = params.oneLinePitch;
    this.steps[2].value = params.oAStreet;
    this.steps[3].value = params.oASuite;
    this.steps[4].value = params.oAZipCode;
    this.steps[5].value = params.phone;
    this.steps[6].value = params.website;
    this.steps[7].value = params.invest;
    this.steps[8].value = params.estMonth;
    return $.Deferred().resolve();
  };
})();