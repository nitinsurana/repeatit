(function () {
    'use strict';

    var UsageCollection = Backbone.Collection.extend({
        url: '/usages'
    });

    var DashboardView = Backbone.View.extend({
        el: 'body',
        initialize: function () {
            var self = this;
            this.collection = new UsageCollection();
            this.usageTemplate = $("#usageTemplate").html();
            socket.on('new usage', function (model) {
                self.collection.add(model);
            });
            this.collection.on('add', this.addUsage, this);
            this.collection.fetch().done(function () {
                self.render();
            });
        },
        render: function () {
            var self = this;
            _.each(this.collection.models, function (model) {
                self.addUsage(model);
            });
        },
        addUsage: function (model) {
            var html = _.template(this.usageTemplate)({data: model.toJSON()});
            this.$("#usageList tbody").prepend($(html).hide().slideDown());
        }
    });

    var v = new DashboardView();
})();


