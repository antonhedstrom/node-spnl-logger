define([
  'marionette',

  '../models/user.model',
  'tpl!./templates/main',

  // Views
  '../views/userprofile',
  '../views/user-menu'
], function(
  Marionette,

  UserModel,
  MainTemplate,

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
