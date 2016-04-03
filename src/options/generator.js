define([
    'jquery',
    'underscore',
    'backbone',
    'text!generator.html',
    'text!recipeStepTemplate.html',
    'select2',
    'jqueryui'
], function ($, _, Backbone, GeneratorTemplate, recipeStepTemplate) {
    'use strict';
    var placeholderStepTemplate = '<div class="selection-placeholder">Add a recipe</div>';

    var SelectRecipeCollection = Backbone.Collection.extend({
        comparator: 'order',
        findByOrder: function (order) {
            return this.models.find(function (m) {
                return m.get('order') === order;
            });
        }
    });
    var SelectionRowView = Backbone.View.extend({
        initialize: function () {
            this.render();
            this.listenTo(this.model, 'remove', this.removeEl);
        },
        removeEl: function () {
            this.remove();
        },
        render: function () {
            var $div = _.template(recipeStepTemplate)(this.model.toJSON());
            this.$el.html($div);
        },
        events: {
            'change select': 'setPset'
        },
        setPset: function () {
            var pSet = this.$("select.pSet").val();
            this.model.set('pSet', pSet);
        }
    });
    var RecordModel = Backbone.Model.extend({
        defaults: {
            project: 'recording',
            type: 'parent'
        },
        parseAndSet: function (json) {
            this.set('title', json.title);
            var steps = [];
            _.each(json.steps, function (r) {
                steps.push({
                    type: 'recipe',
                    _id: r._id,
                    pSet: r.pSet
                });
            });
            this.set('steps', steps);
            return this;
        },
        save: function () {
            var self = this;
            console.log(this.toJSON());
            console.log(JSON.stringify(this.toJSON()));
            chrome.runtime.sendMessage({origin: 'repeatit', action: 'updateRecording', recipe: this.toJSON()},
                function (response) {
                    if (!response.status) {
                        console.log("Sending generated recipe to background failed : ");
                        console.log(response);
                    } else {
                        console.log("Sent generated recipe to background for saving.");
                        console.log(response);
                        self.set('_id', response.recipe._id);
                        self.set('userId', response.recipe.userId);
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
            this.model = opts.model || new RecordModel();
            this.background = chrome.extension.getBackgroundPage().background;
            this.collection = new Backbone.Collection(this.background.recipelist);
            this.selectRecipeCollection = opts.selectRecipeCollection || new SelectRecipeCollection();
            this.selectRecipeViews = [];
            this.listenTo(this.selectRecipeCollection, 'add', this.createRecipeStep);
            this.render();
        },
        events: {
            "select2:select": 'addRecipe',
            "click .selection-placeholder": "createEmptyStep",
            "click .removeStep": "removeStep",
            "submit #recipe-form": "saveFlow"
        },
        saveFlow: function (e) {
            e.preventDefault();
            var json = {
                title: this.$('.flowRecipeTitle').val(),
                steps: this.selectRecipeCollection.toJSON()
            };
            var model = this.model;
            model.parseAndSet(json);
            var valid = model.validate();
            if (!valid.status) {
                window.alert(valid.msg);
            } else {
                model.save();
            }
        },
        removeStep: function (e) {
            var order = $(e.currentTarget).closest('.recipeItem').data('order');
            this.selectRecipeCollection.remove(this.selectRecipeCollection.findByOrder(order));
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
            $target.html(this.createSelectOptions());
            $target.find(".recipes").select2({
                placeholder: 'Select a recipe',
                multiple: true,
                maximumSelectionLength: 1
            });
        },
        addRecipe: function (e) {
            var recipeId = e.params.data.id;
            var recipe = this.collection.find(function (m) {
                return m.get('_id') === recipeId;
            });
            if (recipe.get('pSets') && !recipe.get('pSet')) {
                recipe.set('pSet', recipe.get('pSets')[0].title);
            }
            recipe.set('order', this.selectRecipeCollection.length);
            this.selectRecipeCollection.add(new Backbone.Model(recipe.toJSON()));
        },
        createRecipeStep: function (model) {
            var selectionView = new SelectionRowView({
                model: model
            });
            this.selectRecipeViews.push(selectionView);
            this.$("#selection").append(selectionView.$el);
            this.$("#selection").sortable({refresh: true});
            this.createPlaceholderStep();
            this.$("[data-tooltip]").tooltip();
        },
        createSelectOptions: function () {
            var $select = $("<select/>", {
                "class": "recipes",
                "multiple": "true"
            });
            _.each(this.collection.models, $.proxy(function (model) {
                if (model.get('title')) {
                    var $opt = $("<option/>", {
                        value: model.get('_id')
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
            this.$("#selection").sortable({
                update: $.proxy(this.updateSortOrderInCollection, this)
            });
            this.renderCollection();
        },
        updateSortOrderInCollection: function () {
            _.each(this.selectRecipeViews, function (view) {
                view.model.set('order', view.$el.index());
            });
            this.selectRecipeCollection.sort({silent: true});
            _.invoke(this.selectRecipeViews, 'remove');     //remove the collection from DOM & then re-render with the new sorted order
            this.selectRecipeViews = [];
            this.renderCollection();
        },
        renderCollection: function () {
            this.selectRecipeCollection.each($.proxy(function (item) {
                this.createRecipeStep(item);
            }, this));
        }
    });
});