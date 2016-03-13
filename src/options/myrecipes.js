define([
    'jquery',
    'underscore',
    'backbone',
    'text!recipes.html',
    'text!accordion_rec.html',
    'text!parameterSet.html'
], function ($, _, Backbone, recipesTemplate, accordionChoiceTemplate, parameterSetTemplate) {
    'use strict';
    return Backbone.View.extend({
        initialize: function () {
            this.background = chrome.extension.getBackgroundPage().background;

            //Forcing background.js to load recorded recipes from Mongo
            chrome.runtime.sendMessage({origin: 'repeatit', action: 'fetchRecordings'},
                $.proxy(function (response) {
                    if (!response) {
                        console.log("Loading recordings from background failed : ");
                        console.log(response);
                    } else {
                        var recipelist = this.background.recipelist;
                        recipelist = _.filter(recipelist, function (r) {
                            return r.project === 'recording';
                        });
                        this.collection = new Backbone.Collection(recipelist);
                        this.render();
                    }
                }, this));
        },
        events: {
            "keyup #search": "searchOnKeyup",
            "submit form[data-recipeid]": "saveRecipe"
        },
        saveRecipe: function (e) {
            e.preventDefault();
            var $form = $(e.currentTarget);
            var json = $form.serializeObject();
            chrome.runtime.sendMessage({origin: 'repeatit', action: 'updateRecording', recipe: json},
                function (response) {
                    if (!response.status) {
                        console.log("Sending recipe to background failed : ");
                        console.log(response);
                    } else {
                        console.log("Sent recipe to background for saving.");
                    }
                });
        },
        render: function () {
            var self = this;
            this.$el.html(_.template(recipesTemplate)());
            _.each(this.collection.models, function (model) {
                if (model.get('title').trim().length > 0) {
                    self.$("#accordion").append(_.template(accordionChoiceTemplate)({data: model.toJSON()}));
                    self.$("#recipe-" + model.get('id')).find(".actions").show();
                }
            });
            this.$(".collapse:eq(0)").addClass('in');
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
        }
    });
});