define([
  'app',
  'marionette',

  'tpl!./templates/main',

  // Models
  '../models/user.model',

  // Views
  '../views/userprofile',
  '../views/user-menu'
], function(
  App,
  Marionette,

  MainTemplate,

  // Models
  UserModel,

  // Views
  UserProfileView,
  UserMenuView
) {
  var Layout = Backbone.Marionette.LayoutView.extend({
    template: MainTemplate,

    regions: {
      header: 'header',
      content: '.content'
    },

    initialize: function(options) {
      if ( !App.models.user ) {
        App.models.user = new UserModel();
      }
      this.userModel = App.models.user;
    },

    onRender: function() {
      var usermenuView = new UserMenuView({
        model: this.userModel,
        activeMenuItem: 'profile'
      });
      var userProfileView = new UserProfileView({
        model: this.userModel
      });
      this.header.show(usermenuView);
      this.content.show(userProfileView);
    },

    loadData: function() {
      this.userModel.fetch();
    },

    destroy: function() {
      this.userModel = null;
    }
  });

  return Layout;
});
