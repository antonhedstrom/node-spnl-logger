require.config({
  baseUrl: "/assets/js",
  paths: {
    app: 'app_start',
    backbone: "libs/backbone",
    'backbone.radio': "libs/backbone.radio.min",
    underscore: "libs/underscore",
    jquery: "libs/jquery-2.1.1.min",
    marionette: "libs/backbone.marionette.min",
    handlebars: 'libs/handlebars-v1.3.0',
    bootstrap: 'libs/bootstrap.min',
    drunkenparrot: 'libs/drunkenparrot.combined.min',
    text: 'libs/text',
    tpl: 'libs/tpl'
  },
  shim: {
    jquery: {
      exports: "jQuery"
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
