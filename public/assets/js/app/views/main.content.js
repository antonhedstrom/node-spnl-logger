define([
  'marionette',
  'tpl!app/templates/main.content',

  'app/views/login'
], function(
  Marionette,
  MainContentTemplate,
  LoginView
) {

  var exports = {};

  exports = Backbone.Marionette.LayoutView.extend({
    template: MainContentTemplate,

    regions: {
      menu: 'navigation',
      content: 'section.content'
    },

    initialize: function(options) {
      console.log("Main content view init", options);
    },

    onRender: function() {
      var loginView = new LoginView();
      this.content.show(loginView);
    }
  });

  return exports;
});
