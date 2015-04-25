define([
  'marionette',

  'tpl!./templates/main',

  // Models
  '../models/user.model',

  // Views
  '../views/userprofile',
  '../views/user-menu'
], function(
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
      this.userModel = new UserModel();
    },

    onRender: function() {
      var usermenuView = new UserMenuView({
        model: this.userModel
      });
      var userProfileView = new UserProfileView({
        model: this.userModel
      });
      this.header.show(usermenuView);
      this.content.show(userProfileView);
    },

    loadData: function() {
      this.userModel.fetch();
    }
  });

  return Layout;
});
