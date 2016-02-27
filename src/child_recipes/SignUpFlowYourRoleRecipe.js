(function(){
  'use strict';

  var id = "SignUpFlowYourRoleRecipe";
  var steps = [
    {
      selector: ".selectable-box-label:eq(0)"
    }
  ];

  var recipe = window.recipe.SignUpFlowYourRoleRecipe = new window.recipe.Recipe(steps,id);
  recipe.start = function (params) {
    return $.Deferred().resolve();
  };
})();
