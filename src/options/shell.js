define([
    'backbone',
    'text!shell.html'
], function (Backbone, ShellTemplate) {
    'use strict';
    var ShellView = Backbone.View.extend({
        el: ".container",
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(_.template(ShellTemplate)());
        },
        setActiveMenu: function (routeName) {
            this.$("ul.nav li").removeClass('active');
            this.$("ul.nav li a[href=#" + routeName + "]").parent().addClass('active');
        }
    });
    return ShellView;
});
