define([
  'app',
  'marionette',
  'tpl!templates/login/main'
], function(
  App,
  Marionette,
  LoginTemplate
) {
  var exports = {};

  exports = Backbone.Marionette.ItemView.extend({
    template: LoginTemplate,
    tagName: 'div',
    className: 'login-container',

    ui: {
      txtUsername: '[name=username]',
      txtPassword: '[name=password]',
      actionLogin: '.action-login'
    },
    events: {
      'keypress @ui.txtUsername': 'onUsernameChange',
      'click @ui.txtUsername': 'onUsernameChange',
      'keypress @ui.txtPassword': 'onPasswordChange',
      'click @ui.txtPassword': 'onPasswordChange',
      'click @ui.actionLogin': 'onLogin'
    },
    initialize: function() {

    },

    onRender: function() {
      this.ui.txtUsername.focus();
    },

    onUsernameChange: function(e) {
      this.clearErrors(e);
      if ( e.which === 13 && this.ui.txtUsername.val().trim() !== '' ) { // Enter
        this.ui.txtPassword.focus();
      }
    },

    onPasswordChange: function(e) {
      this.clearErrors(e);
      if ( e.which === 13 ) { // Enter
        this.onLogin();
      }
    },

    onLogin: function(e) {
      var self = this;

      if ( e ) {
        e.preventDefault();
      }

      var username = this.ui.txtUsername.val().trim();
      var password = this.ui.txtPassword.val().trim();

      if ( username === '' ) {
        this.ui.txtUsername.focus();
        this.onLoginError(this.ui.txtUsername);
        return;
      }
      if ( password === '' ) {
        this.ui.txtPassword.focus();
        this.onLoginError(this.ui.txtPassword);
        return;
      }

      $.post('/login', {
        username: username,
        password: password
      }).done(function(data) {
        self.$el.find('.panel')
          .removeClass('panel-primary')
          .addClass('panel-success');
        App.navigate(data.redirect, {trigger: true});
      }).fail(function() {
        self.ui.txtPassword.focus();
        self.$el.find('.panel')
          .removeClass('panel-primary')
          .addClass('panel-danger');
      });
    },

    onLoginError: function(e) {
      var $target = e;
      if ( e.currentTarget ) {
        $target = $(e.currentTarget);
      }
      $target.closest('.form-group').addClass('has-error');
    },
    clearErrors: function(e) {
      var $target = $(e.currentTarget);
      $target.closest('.form-group').removeClass('has-error');
      this.$el.find('.panel')
        .removeClass('panel-success panel-danger')
        .addClass('panel-primary');

    }
  });

  return exports;
});
