(function(){
  'use strict';

  var id = "GliderEmployerSignUpRecipe";
  var steps = [
    {
      type: 'recipe',
      _id: 'SignUpFlowFillCompanyDetailsRecipe'
    },
    {
      type: 'recipe',
      _id: "SignUpFlowYourRoleRecipe"
    },
    {
      type: 'recipe',
      _id: "SignUpFlowFillSignUpPageRecipe",
      pSets: {}
    }
  ];

  var recipe = window.recipe.GliderEmployerSignUpRecipe = new window.recipe.Recipe(steps,id);
  recipe.start = function (params) {
    console.log(params);
    this.steps[2].pSets.params = params;
    return $.Deferred().resolve();
  };
})();
