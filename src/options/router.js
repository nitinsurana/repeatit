define([
    'jquery',
    'underscore',
    'backbone',
    'shell',
    'bootstrap'
], function ($, _, Backbone, ShellView) {
    'use strict';

    return Backbone.Router.extend({
        routes: {
            "": "redirectToSettings",
            "settings": "settings",
            "recipes": "recipes",
            "myrecipes": "myrecipes",
            "generator": "generator"
        },
        redirectToSettings: function () {
            Backbone.history.navigate("#settings", {trigger: true});
        },
        execute: function (callback, args, name) {
            this.shellView = this.shellView || new ShellView({
                    el: document.body
                });
            this.currentView && this.currentView.remove();
            this.shellView.setActiveMenu(name);
            if (callback) callback.apply(this, args);
        },
        settings: function () {
            require(['settings'], $.proxy(function (View) {
                this.currentView = new View({
                    el: $("<div/>").appendTo(this.shellView.$("#content"))
                });
            }, this));
        },
        recipes: function () {
            require(['recipes'], $.proxy(function (View) {
                this.currentView = new View({
                    el: $("<div/>").appendTo(this.shellView.$("#content"))
                });
            }, this));
        },
        myrecipes: function () {
            require(['myrecipes'], $.proxy(function (View) {
                this.currentView = new View({
                    el: $("<div/>").appendTo(this.shellView.$("#content"))
                });
            }, this));
        },
        generator: function () {
            require(['generator'], $.proxy(function (View) {
                this.currentView = new View({
                    el: $("<div/>").appendTo(this.shellView.$("#content"))
                });
            }, this));
        }
    });
});