'use strict';

var services = angular.module('authServices', ['ngResource']);

// Constants
services.constant('AUTH_EVENTS', {
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
});

// Session
services.service('Session', function() {
  this.create = function(userId, userRole) {
    this.userId   = userId;
    this.userRole = userRole;
  };

  this.destroy = function() {
    this.userId   = null;
    this.userRole = null;
  };
});

// AuthService
services.factory('AuthService', ['$http', 'Session', function($http, Session) {
  var authService = {};

  authService.login = function(credentials) {
    return $http
      .post(window.apiPath + 'login', credentials)
      .then(function(response) {
        Session.create(response.data.id, response.data.role);
        return response.data;
      });
  };

  authService.isAuthenticated = function() {
    return !!Session.userId;
  };

  authService.isAuthorised = function(authorisedRoles) {
    if (!angular.isArray(authorisedRoles)) {
      authorisedRoles = [authorisedRoles];
    }

    return (authService.isAuthenticated() && authorisedRoles.indexOf(Session.userRole) !== -1);
  };

  authService.getCurrentUser = function() {
    return $http.get(window.apiPath + 'profile').then(function(response) {
      Session.create(response.data.id, response.data.role);
      return response.data;
    });
  };

  return authService;
}]);

services.factory('AuthResolver', ['$q', '$rootScope', '$state', function($q, $rootScope, $state) {
  return {
    resolve: function() {
      var deferred = $q.defer();
      var unwatch = $rootScope.$watch('currentUser', function(currentUser) {
        if (angular.isDefined(currentUser)) {
          if (currentUser) {
            deferred.resolve(currentUser);
          } else {
            deferred.reject();
            $state.go('user-login');
          }
          unwatch();
        }
      });
      return deferred.promise;
    }
  };
}]);
