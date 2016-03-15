define([
    'jquery',
    'underscore',
    'backbone',
    'text!generator.html',
    'select2',
    'jqueryui'
], function ($, _, Backbone, GeneratorTemplate) {
    'use strict';
    var placeholderStepTemplate = '<div class="selection-placeholder">Add a child recipe</div>';
    var recipeStepTemplate = '<div class="recipeItem"><input type="hidden" name="recipeId" value="<%-id%>"/> <span class="move pull-left"><i class="glyphicon glyphicon-move"></i></span> &nbsp;&nbsp;&nbsp;<%-title%> <span data-tooltip title="Delete" class="removeStep pull-right"><i class="glyphicon glyphicon-remove"></i></span></div>';

    var RecipeModel = Backbone.Model.extend({
        parseAndSet: function (json) {
            this.set('title', json.title);
            var steps = [];
            _.each(json.recipeId, function (r) {
                steps.push({
                    type: 'recipe',
                    recipeId: r
                });
            });
            this.set('steps', steps);
            return this;
        },
        save: function () {
            chrome.runtime.sendMessage({origin: 'repeatit', action: 'updateRecording', recipe: this.toJSON()},
                function (response) {
                    if (!response.status) {
                        console.log("Sending generated recipe to background failed : ");
                        console.log(response);
                    } else {
                        console.log("Sent generated recipe to background for saving.");
                    }
                });
        },
        validate: function () {
            var v = {
                status: true,
                msg: ''
            };
            if (!this.get('title')) {
                v.status = false;
                v.msg = "Please enter recipe title";
            } else if (this.get('steps').length === 0) {
                v.status = false;
                v.msg = "Please add atleast one child recipe";
            }
            return v;
        }
    });

    return Backbone.View.extend({
        initialize: function (opts) {
            opts = opts || {};
            this.model = opts.model || new RecipeModel();
            this.background = chrome.extension.getBackgroundPage().background;
            this.collection = new Backbone.Collection(this.background.recipelist);
            this.render();
        },
        events: {
            "select2:select": 'addRecipe',
            "click .selection-placeholder": "createEmptyStep",
            "click .removeStep": "removeStep",
            "submit #recipe-form": "saveRecipe"
        },
        saveRecipe: function (e) {
            e.preventDefault();
            var json = this.$("#recipe-form").serializeObject();
            var model = new RecipeModel();
            model.parseAndSet(json);
            var valid = model.validate();
            if (!valid.status) {
                window.alert(valid.msg);
            } else {
                model.save();
            }
        },
        removeStep: function (e) {
            $(e.currentTarget).closest('.recipeItem').remove();
            this.$("#selection").sortable({refresh: true});
        },
        createPlaceholderStep: function () {
            this.$(".selection-placeholder").remove();
            this.$(".step-container").prepend(placeholderStepTemplate);
            if (this.$("#selection div").length > 0) {
                this.$(".step-container").append(placeholderStepTemplate);
            }
        },
        createEmptyStep: function (e) {
            var $target = $(e.target);
            if (!$target.hasClass('selection-placeholder')) {
                return;
            }
            $target.html(this.createSelect2());
            $target.find(".recipes").select2({
                placeholder: 'Select a recipe',
                multiple: true,
                maximumSelectionLength: 1
            });
        },
        addRecipe: function (e) {
            var recipeId = e.params.data.id;
            var recipe = this.collection.find(function (m) {
                return m.id === recipeId;
            });
            var $div = _.template(recipeStepTemplate)({id: recipe.get('id'), title: recipe.get('title')});
            this.$("#selection").append($div);
            this.$("#selection").sortable({refresh: true});
            this.createPlaceholderStep();
            this.$("[data-tooltip]").tooltip();
        },
        createSelect2: function () {
            var $select = $("<select/>", {
                "class": "recipes",
                "multiple": "true"
            });
            _.each(this.collection.models, $.proxy(function (model) {
                if (model.get('title')) {
                    var $opt = $("<option/>", {
                        value: model.get('id')
                    });
                    $opt.html(model.get('title'));
                    $opt.appendTo($select);
                }
            }, this));
            return $select;
        },
        render: function () {
            this.$el.html(_.template(GeneratorTemplate)({data: this.model.toJSON()}));
            this.createPlaceholderStep();
        }
    });
});