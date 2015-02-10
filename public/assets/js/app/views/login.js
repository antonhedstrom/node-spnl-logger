define([
  'marionette',
  'tpl!app/templates/login/main'
], function(
  Marionette,
  LoginTemplate
) {
  var exports = {};

  exports = Backbone.Marionette.ItemView.extend({
    template: LoginTemplate,
    ui: {
      txtUsername: 'input.username',
      txtPassword: 'input.password',
      actionLogin: 'button.action-login'
    },
    events: {
      'keypress @ui.txtUsername': 'onUsernameKeypress',
      'keypress @ui.txtPassword': 'onPasswordKeypress',
      'click @ui.actionLogin': 'onLogin'
    },
    initialize: function() {

    },

    onRender: function() {
      this.ui.txtUsername.focus();
    },

    onUsernameKeypress: function(e) {
      if ( e.which === 13 && this.ui.txtUsername.val().trim() !== '' ) { // Enter
        this.ui.txtPassword.focus();
      }
    },

    onPasswordKeypress: function(e) {
      if ( e.which === 13 ) { // Enter
        this.onLogin();
      }
    },

    onLogin: function(e) {
      if ( e ) {
        e.preventDefault();
      }

      var username = this.ui.txtUsername.val().trim();
      var password = this.ui.txtPassword.val().trim();

      if ( username === '' ) {
        this.ui.txtUsername.focus();
        return;
      }
      if ( password === '' ) {
        this.ui.txtPassword.focus();
        return;
      }

      console.log('Login in', username, password);
    }
  });

  return exports;
});
