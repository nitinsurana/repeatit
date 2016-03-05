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
            this.collection.fetch();        //It'll trigger `add` on collection
			this.getGroupedData();
        },
        addUsage: function (model) {
            var html = _.template(this.usageTemplate)({data: model.toJSON()});
            this.$("#usageList tbody").prepend($(html).hide().slideDown());
        },
		getGroupedData: function(){
			var self = this;
			$.ajax({
				url:"groupUsage"
			}).done(function(response){
				self.drawUsageChart(response);
			});
		},
		drawUsageChart: function(response){
			var data = response.map(function(usage){
				return [(new Date(usage._id)).getTime(),usage.value];
			});
			this.$('#container').highcharts('StockChart', {
				chart: {
					alignTicks: false
				},
				rangeSelector: {
					selected: 1
				},
				title: {
					text: 'RepeatIt Usage'
				},
				series: [{
					type: 'column',
					name:'RepeatIt Usage',
					data: data,
					dataGrouping: {
						units: [[
							'week', // unit name
							[1] // allowed multiples
						], [
							'month',
							[1, 2, 3, 4, 6]
						]]
					}
				}]
			});
		}
    });

    var v = new DashboardView();
})();

