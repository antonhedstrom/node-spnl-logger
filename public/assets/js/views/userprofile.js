define([
  'app',
  'marionette',
  'tpl!./templates/userprofile'
], function(
  App,
  Marionette,
  UserProfileTemplate
) {
  var exports = {};

  exports = Backbone.Marionette.ItemView.extend({
    template: UserProfileTemplate,
    tagName: 'div',
    className: 'user-profile',

    ui: {
      firstname: '.firstname',
      lastname: '.lastname',
      'pwd1': '.new-password',
      'pwd2': '.new-password2',
      'notificationBar': 'notification-container',
      'save': '.btn-success'
    },

    events: {
      'change @ui.new-password2': 'checkPassword',
      'click @ui.save': 'saveUserProfile'
    },

    modelEvents: {
      change: 'render'
    },

    checkPassword: function(e) {
      if ( this.ui.pwd1 !== this.ui.pwd2 ) {
        this.ui.pwd2.focus();
        indicateError(this.ui);
        return false;
      }
      return true;
    },

    saveUserProfile: function() {
      var userData = {};
      if ( this.checkPassword ) {
        userData = {
          firstname: this.ui.firstname.val().trim(),
          lastname: this.ui.lastname.val().trim(),
          password: this.ui.pwd1
        }
        this.model.save(userData).then(function() {

        }).fail(function() {

        });
      }
    },

    indicateError: function(element) {
      element.closest('.form-group').addClass('has-error');
    },

    clearErrors: function(element) {
      element.closest('.form-group').removeClass('has-error');
    },

    showMsg: function(msg) {
      this.ui.notificationBar.append(
        $('<div>')
          .addClass('alert alert-' + msg.type)
          .html(msg.text)
      );
      setTimeout(clearMsg, 4000);
    },

    clearMsg: function(speed) {
      var self = this;
      speed = speed || 'slow';
      this.ui.notificationBar.fadeOut(speed, function() {
        self.ui.notificationBar.empty();
      });
    }

  });

  return exports;
});
