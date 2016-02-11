$(function () {
    var MainView = Backbone.View.extend({
        initialize: function () {
            var self = this;
            this.accordionChoiceTemplate = $("#accordion-panel-template").text();
            chrome.storage.sync.get('recipelist', function (result) {
                self.collection = new Backbone.Collection(result.recipelist);
                self.renderRecipes();
            });
        },
        el: ".container",
        events: {
            "keyup #search": "searchOnKeyup"
        },
        searchOnKeyup: function (e) {
            var self = this;
            clearTimeout(this.searchTimeout);
            var searchTerm = $(e.currentTarget).val();
            this.searchTimeout = setTimeout(function () {
                self.findRecipes(searchTerm.toLowerCase());
            }, 200);
        },
        findRecipes: function (searchTerm) {
            var self = this;
            _.each(this.collection.models, function (model) {
                if (model.get('title').toLowerCase().indexOf(searchTerm) > -1 || model.get('description').toLowerCase().indexOf(searchTerm) > -1) {
                    self.$("#recipe-" + model.get('id')).show();
                } else {
                    self.$("#recipe-" + model.get('id')).hide();
                }
            });
        },
        renderRecipes: function () {
            var self = this;
            _.each(this.collection.models, function (model) {
                self.$("#accordion").append(_.template(self.accordionChoiceTemplate)({data: model.toJSON()}));
            });
            //Collapse all but first one
            self.$(".collapse").collapse();
            setTimeout(function () {        //After the collapse animation for others complete, show the first one expanded
                self.$(".collapse:eq(0)").collapse('show');
            }, 500);
        }
    });
    new MainView();
});