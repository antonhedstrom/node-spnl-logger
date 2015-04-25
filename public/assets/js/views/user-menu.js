define([
  'app',
  'marionette',

  'tpl!./templates/user-menu'
], function(
  App,
  Marionette,

  UserMenuTemplate
) {

  var MenuItemView = Backbone.Marionette.ItemView.extend({
    template: UserMenuTemplate,
    tagName: 'div',
    className: 'user-menu',

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
