define([
    'jquery',
    'underscore',
    'backbone',
    'text!settings.html'
], function ($, _, Backbone, SettingsTemplate) {
    'use strict';
    return Backbone.View.extend({
        initialize: function () {
            this.background = chrome.extension.getBackgroundPage().background;
            this.render();
        },
        render: function () {
            chrome.storage.sync.get('settings', $.proxy(function (r) {
                this.$el.html(_.template(SettingsTemplate)({data: r.settings}));
            }, this));
        },
        events: {
            "click #saveSettings": "saveSettings"
        },
        saveSettings: function (e) {
            var self = this;
            e.preventDefault();
            var newSettings = {};
            _.each(this.$("form").serializeArray(), function (o) {
                newSettings[o.name] = o.value;
            });
            newSettings['newWindow'] = newSettings.newWindow === 'on' ? true : false;       //Converting checkbox to boolean
            chrome.storage.sync.set({settings: newSettings}, function () {
                console.log("Saved settings form to storage");
                self.background.updatePopup(newSettings.newWindow);
                window.alert("Saved Settings");
            });
        }
    });
});