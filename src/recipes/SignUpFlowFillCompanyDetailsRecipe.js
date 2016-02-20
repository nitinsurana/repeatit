/**
 * Created by himadri on 2/19/16.
 */

(function(){
  var steps = [
    {
      selector: "input[name=companyName]",
      action: function(){
        this.val('tech').trigger("focus").trigger("change").trigger("input").trigger("focus");
      }
    },
    {
      selector : ".company-result:eq(6)"
    },
    {
      selector: "input[name=companyLocation]",
      action: function(){
        this.val('Bangalore, Karnataka').trigger("focus").trigger("change").trigger("input");
      }
    },
    {
      selector : ".next"
    }
  ];

  var recipe = window.recipe.SignUpFlowFillCompanyDetailsRecipe = new window.recipe.Recipe(steps);
  recipe.start = function(params) {
    //this.steps[0].value = params.self.name;
    //this.steps[1].value = params.self.cLocation;
    return $.Deferred().resolve();
  }
})();