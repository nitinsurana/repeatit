requirejs.config({
    waitTimeout: 20,

    paths: {
        'jquery': '/js/jquery-2.0.3.min',
        'underscore': '/js/underscore-min',
        'backbone': '/js/backbone-min',
        'bootstrap': '/js/bootstrap.min',
        'text': '/js/text.min'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery']
        }
    }
});
requirejs.onError = function (e) {
    'use strict';
    console.error(e);
};
require(['router'], function (Router) {
    'use strict';
    var router = new Router();
    Backbone.history.start();
});