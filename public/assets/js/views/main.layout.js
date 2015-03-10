define([
  'marionette',
  'views/main.content',
  'tpl!templates/main.layout',
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
    },

    onRender: function() {
      var contentLayout = new MainContentView();
      this.content.show(contentLayout);
    }
  });

  return exports;
});
