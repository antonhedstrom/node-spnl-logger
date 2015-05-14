define([
  'app',
  'marionette',
  'backbone',
  'backbone.radio',

  'tpl!./templates/user-menu'
], function(
  App,
  Marionette,
  Backbone,
  BackboneRadio,

  UserMenuTemplate
) {

  var appChannel = BackboneRadio.channel('app');

  var MenuItemView = Backbone.Marionette.ItemView.extend({
    template: UserMenuTemplate,
    tagName: 'div',
    className: 'user-menu',

    initialize: function(options) {
      this.model.set('menuItems', [
        { title: 'Home', url: '#home' },
        { title: 'Statistics', url: '#stats' },
        { title: 'Payments', url: '#payments' }
      ]);

      var activeUrl = '#' + Backbone.history.getFragment().split('/')[0];
      this.model.set('activeMenuItem', activeUrl);
    },

    modelEvents: {
      change: 'render'
    },

    templateHelpers: {
      getFullName: function() {
        return this.firstname + ' ' + this.lastname;
      }
    }

  });

  return MenuItemView;
});
