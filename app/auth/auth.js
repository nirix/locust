'use strict';

angular.module('locust.auth', ['ui.router'])
.config(function($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'auth/login.html'
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
