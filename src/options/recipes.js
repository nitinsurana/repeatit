define([
    'jquery',
    'underscore',
    'backbone',
    'text!recipes.html',
    'text!accordion.html',
    'text!parameterSet.html'
], function ($, _, Backbone, recipesTemplate, accordionChoiceTemplate, parameterSetTemplate) {
    'use strict';
    return Backbone.View.extend({
        initialize: function () {
            this.background = chrome.extension.getBackgroundPage().background;
            var recipelist = this.background.recipelist;
            recipelist = _.filter(recipelist, function (r) {
                return r.project !== 'recording';
            });
            this.collection = new Backbone.Collection(recipelist);
            this.render();
        },
        events: {
            "keyup #search": "searchOnKeyup",
            "click .parameter-sets .reset": "resetpSets",
            "click .parameter-sets .save": "savepSets"
        },
        render: function () {
            var self = this;
            this.$el.html(_.template(recipesTemplate)({data: {placeholder: "Search all recipes..."}}));
            _.each(this.collection.models, function (model) {
                if (model.get('title').trim().length > 0) {
                    if (model.get('pSets')) {
                        self.$("#accordion").append(_.template(accordionChoiceTemplate)({data: model.toJSON()}));
                        self.renderpSets(model);
                        self.$("#recipe-" + model.get('_id')).find(".actions").show();
                    }
                }
            });
            this.$(".collapse:eq(0)").addClass('in');
        },
        savepSets: function (e) {
            var recipeId = $(e.currentTarget).data('recipeid');
            var $recipeContainer = this.$("#recipe-" + recipeId);
            var pSets = [];
            //{setName:{paramKey:paramValue}, setName2:{paramKey2:paramValue2, paramKey3:paramValue3}}
            $recipeContainer.find("[data-paramset]").each(function () {
                var setName = $(this).data('paramset').replace(recipeId + '-', '');
                var obj = {
                    title: setName,
                    params: {}
                };
                $(this).find("[data-paramkey]").each(function () {
                    var paramKey = $(this).data('paramkey');
                    var paramValue = $(this).val();
                    obj.params[paramKey] = paramValue;
                });
                pSets.push(obj);
            });
            var storageKey = 'pSets-' + recipeId,
                store = {};
            store[storageKey] = pSets;
            chrome.storage.sync.set(store, function () {
                console.log("Saved pSets to storage : " + recipeId);
                window.alert("Parameters Saved");
            });
        },
        resetpSets: function (e) {
            var recipeId = $(e.currentTarget).data('recipeid');
            var recipe = _.find(this.collection.toJSON(), function (recipe) {
                return recipe._id === recipeId;
            });
            var pSets = {};
            pSets["pSets-" + recipe._id] = recipe.pSets;
            chrome.storage.sync.set(pSets, function () {
                console.log("Reset pSets to default : " + recipe._id);
                window.location.reload();       //Todo re-render of recipe accordion instead of reload
            });
            //Todo code to reset pSets for the clicked recipe
            //Remove from storage pSets-recipeId
            //Take from storage - recipelist
            //Save in storage
            //Render this particular recipe
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
                    self.$("#recipe-" + model.get('_id')).show();
                } else {
                    self.$("#recipe-" + model.get('_id')).hide();
                }
            });
        },
        renderpSets: function (model) {
            var self = this,
                storageKey = 'pSets-' + model.get('_id'),
                $pSets = self.$("#recipe-" + model.get('_id') + " .parameter-sets ");

            chrome.storage.sync.get(storageKey, function (m) {
                var pSets = m[storageKey];
                _.each(pSets, function (obj) {
                    var tabTitle = '<li><a href="#parameterSet-' + model.get('_id') + '-' + obj.title + '" data-toggle="tab">' + obj.title + '</a></li>';
                    $pSets.find(".tabs-left").append(tabTitle);

                    var tabContent = _.template(parameterSetTemplate)({
                        data: {
                            id: model.get('_id') + '-' + obj.title,
                            params: obj.params
                        }
                    });
                    $pSets.find(".tab-content").append(tabContent);
                });
                $pSets.find(".tabs-left li:first").addClass('active');
                $pSets.find(".tab-content .tab-pane:first").addClass('active');
            });
        }
    });
});