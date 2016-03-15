requirejs.config({
    waitTimeout: 20,

    paths: {
        'jquery': '/js/jquery-2.0.3.min',
        'underscore': '/js/underscore-min',
        'backbone': '/js/backbone-min',
        'bootstrap': '/js/bootstrap.min',
        'text': '/js/text.min',
        'select2': '/js/select2.min',
        'jqueryui':'/js/jquery-ui.min'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery']
        }
    }
});

requirejs.onError = function (e) {
    'use strict';
    console.error(e.stack);
};

require(['jquery', 'router'], function ($, Router) {
    'use strict';

    $.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    var router = new Router();
    Backbone.history.start();
});