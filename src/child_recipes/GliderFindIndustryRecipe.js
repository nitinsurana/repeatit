(function(){
  'use strict';

  var id = "GliderFindIndustryRecipe";
  var steps = [
    {
      selector: "input#suggest-categories"
    }
  ];
  var recipe = window.recipe.GliderFindIndustryRecipe = new window.recipe.Recipe(steps,id);
  recipe.start = function (params) {
    this.steps[0].action = function() {
      var categories,
        hiddenField,
        industries = [ "3D Printing", "Accounting", "Agriculture", "Apps", "Art", "Career Planning", "Cars", "Charity",
        "Charter Schools", "Chat", "Child Care", "CRM", "Crowdfunding", "Crowdsourcing", "Curated Web", "Customer Service",
        "Data Centers", "Data Security", "Data Visualization", "Databases", "Delivery", "Doctors", "Document Management",
        "Human Resources", "Identity", "Incentives", "Incubators", "Internet TV", "Investment Management", "iOS", "iPad",
        "Logistics Company", "Low Bid Auctions", "Loyalty Programs", "M2M", "Mac", "Mobility", "Monetization", "Moneymaking",
        "Music", "Natural Resources", "Navigation", "New Product Development", "News", "NFC", "Non Profit", "Nutrition",
        "Office Space", "Facilities Services", "Sporting Goods", "Think Tanks", "Tobacco", "Veterinary", "Warehousing"
      ];
      for(var i = 0; i < 3; i++){
        var index = Math.floor((Math.random() * industries.length));
        $(this.selector).tagsinput('add', industries[index]);
      }
      categories = $(this.selector).tagsinput('items');
      hiddenField = $("input[name='empCateg']");
      hiddenField.val(null);
      hiddenField.val(categories).trigger('change');
    };
  };
})();