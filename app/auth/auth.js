'use strict';

angular.module('locust.auth', ['ui.router', 'ngResource'])
.config(function($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'auth/login.html'
  });

  $stateProvider.state('logout', {
    url: '/logout',
    controller: function($rootScope, $location, AuthService) {
      AuthService.logout();
      $rootScope.setCurrentUser(null);
      $location.path('/');
    }
  });
})
.controller('LoginController', function($scope, $rootScope, $location, AUTH_EVENTS, AuthService) {
  $scope.credentials = {
    username: null,
    password: null
  };

  $scope.login = function(credentials) {
    AuthService.login(credentials).then(function(user) {
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      $scope.setCurrentUser(user);
      $location.path('/');
    },
    function() {
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
    });
  };
});
