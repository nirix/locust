'use strict';

angular.module('locust.auth')

// Constants
.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorised: 'auth-not-authorised'
}).constant('USER_ROLES', {
  all: '*',
  admin: 'admin',
  user: 'user',
  guest: 'guest'
})

// AuthSession
.service('AuthSession', function($http) {
  this.create = function(userId, userRole) {
    this.userId   = userId;
    this.userRole = userRole;
  };

  this.destroy = function() {
    this.userId   = null;
    this.userRole = null;
  };
})

// AuthService
.factory('AuthService', function($http, AuthSession) {
  var authService = {};

  authService.login = function(credentials) {
    return $http
      .post(window.apiPath + 'login', credentials)
      .then(function(response) {
        AuthSession.create(response.data.id, response.data.role);
        return response.data;
      });
  };

  authService.logout = function() {
    return $http.delete(window.apiPath + 'logout').then(function() {
      AuthSession.destroy();
    });
  };

  authService.isAuthenticated = function() {
    return !!AuthSession.userId;
  };

  authService.isAuthorised = function(authorisedRoles) {
    if (!angular.isArray(authorisedRoles)) {
      authorisedRoles = [authorisedRoles];
    }

    return (authService.isAuthenticated() && authorisedRoles.indexOf(AuthSession.userRole) !== -1);
  };

  authService.getCurrentUser = function() {
    return $http.get(window.apiPath + 'profile').then(function(response) {
      AuthSession.create(response.data.id, response.data.role);
      return response.data;
    });
  };

  return authService;
})

// AuthResolver
.factory('AuthResolver', function($q, $rootScope, $state) {
  return {
    resolve: function() {
      var deferred = $q.defer();
      var unwatch = $rootScope.$watch('currentUser', function(currentUser) {
        if (angular.isDefined(currentUser)) {
          if (currentUser) {
            deferred.resolve(currentUser);
          } else {
            deferred.reject();
            $state.go('login');
          }

          unwatch();
        }
      });

      return deferred.promise;
    }
  };
});
