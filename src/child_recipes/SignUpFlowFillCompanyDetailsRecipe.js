(function () {
    'use strict';

	var id = "SignUpFlowFillCompanyDetailsRecipe";
    var steps = [
        {
            selector: "input[name=companyName]",
            action: function () {
                this.val('tech').trigger("focus").trigger("change").trigger("input").trigger("focus");
            }
        },
        {
            selector: ".company-result:eq(6)"
        },
        {
            selector: "input[name=companyLocation]",
            action: function () {
                this.val('Bangalore, Karnataka').trigger("focus").trigger("change").trigger("input");
            }
        },
        {
            selector: ".next"
        }
    ];

    var recipe = window.recipe.SignUpFlowFillCompanyDetailsRecipe = new window.recipe.Recipe(steps,id);
    recipe.start = function (params) {
        return $.Deferred().resolve();
    };
})();
