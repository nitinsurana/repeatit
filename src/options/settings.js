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
            chrome.storage.local.get('settings', $.proxy(function (r) {
                var model = r.settings;
                chrome.storage.local.get('userId', $.proxy(function (u) {
                    model.userId = u.userId;
                    this.$el.html(_.template(SettingsTemplate)({data: model}));
                }, this));
            }, this));
        },
        events: {
            "click #saveSettings": "saveSettings",
            "click #userId": "selectUserId"
        },
        selectUserId: function () {
            var doc = window.document,
                text = doc.getElementById('userId'), range, selection;
            if (doc.body.createTextRange) {
                range = document.body.createTextRange();
                range.moveToElementText(text);
                range.select();
            } else if (window.getSelection) {
                selection = window.getSelection();
                range = document.createRange();
                range.selectNodeContents(text);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        },
        saveSettings: function (e) {
            var self = this;
            e.preventDefault();
            var newSettings = {};
            _.each(this.$("form").serializeArray(), function (o) {
                newSettings[o.name] = o.value;
            });
            newSettings['newWindow'] = newSettings.newWindow === 'on' ? true : false;       //Converting checkbox to boolean
            chrome.storage.local.set({settings: newSettings}, function () {
                console.log("Saved settings form to storage");
                self.background.updatePopup(newSettings.newWindow);
                window.alert("Saved Settings");
            });
        }
    });
});