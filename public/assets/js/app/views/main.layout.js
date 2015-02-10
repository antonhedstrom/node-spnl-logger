define([
  'marionette',
  'app/views/main.content',
  'tpl!app/templates/main.layout',
], function(
  Marionette,
  MainContentView,
  MainLayoutTemplate
) {

  var exports = {};

  exports = Backbone.Marionette.LayoutView.extend({
    template: MainLayoutTemplate,

    regions: {
      header: 'header',
      content: 'section.middle',
      footer: 'footer'
    },

    initialize: function(options) {
      console.log("Main view init", options);
    },

    onRender: function() {
      var contentLayout = new MainContentView();
      this.content.show(contentLayout);
    }
  });

  return exports;
});
