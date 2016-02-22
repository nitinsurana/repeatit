(function(){
  'use strict';

  var steps = [
    {
      type: 'recipe',
      recipeId: 'SignUpFlowFillCompanyDetailsRecipe'
    },
    {
      type: 'recipe',
      recipeId: "SignUpFlowYourRoleRecipe"
    },
    {
      type: 'recipe',
      recipeId: "SignUpFlowFillSignUpPageRecipe",
      params: {}
    }
  ];

  var recipe = window.recipe.GliderEmployerSignUpRecipe = new window.recipe.Recipe(steps);
  recipe.start = function (params) {
    console.log(params);
    this.steps[2].params = params.self;
    return $.Deferred().resolve();
  };
})();