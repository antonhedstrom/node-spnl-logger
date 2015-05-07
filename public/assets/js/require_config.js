require.config({
  baseUrl: "/assets/js",
  paths: {
    app: 'app_start',
    backbone: "libs/backbone/backbone-min",
    'backbone.radio': "libs/backbone.radio/build/backbone.radio.min",
    underscore: "libs/underscore/underscore-min",
    jquery: "libs/jquery/dist/jquery.min",
    'jquery.datetimepicker': "libs/jquery-datetimepicker/jquery.datetimepicker",
    marionette: "libs/backbone.marionette/lib/backbone.marionette.min",
    handlebars: 'libs/handlebars/dist/handlebars.min',
    bootstrap: 'libs/bootstrap/dist/js/bootstrap.min',
    alertify: 'libs/alertify/lib/alertify.min',
    drunkenparrot: 'local_libs/drunkenparrot.combined.min',
    text: 'libs/requirejs-text/text',
    tpl: 'local_libs/tpl'
  },
  shim: {
    jquery: {
      exports: "jQuery"
    },
    'jquery.datetimepicker': {
      deps: ["jquery"],
      exports: "jQuery.datetimepicker"
    },
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ["jquery", "underscore"],
      exports: "Backbone"
    },
    'backbone.radio': {
      deps: ["backbone"],
      exports: "Backbone.Radio"
    },
    marionette: {
      deps: ["jquery", "underscore", "backbone"],
      exports: "Marionette"
    },
    handlebars: {
      deps: [],
      exports: "Handlebars"
    },
    bootstrap: {
      deps: ['jquery'],
      exports: "Bootstrap"
    },
    drunkenparrot: {
      deps: ['jquery', 'bootstrap'],
      exports: "Drunkenparrot"
    }
  },
  tpl: {
    extension: '.tpl'
  }
});


// Fire things up!
require([
  'app',
  'drunkenparrot'
], function(
  Application
) {
  Application.start();
});
