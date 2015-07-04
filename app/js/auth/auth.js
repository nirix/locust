'use strict';

angular.module('locust.auth', ['ui.router', 'ngResource'])
.config(function($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'views/auth/login.html'
  });

  $stateProvider.state('logout', {
    url: '/logout',
    controller: function($rootScope, $location, AuthService) {
      AuthService.logout();
      $rootScope.setCurrentUser(null);
      $location.path('/');
    }
  });

  $stateProvider.state('register', {
    url: '/register',
    templateUrl: 'views/auth/register.html'
  });
})
.controller('LoginController', function($scope, $rootScope, $location, AUTH_EVENTS, AuthService) {
  $scope.credentials = {
    username: null,
    password: null
  };

  $scope.hideError = function() {
    $scope.showError = false;
  };

  $scope.login = function(credentials) {
    AuthService.login(credentials).then(function(user) {
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      $scope.setCurrentUser(user);
      $location.path('/');
    },
    function() {
      $scope.showError = true;
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
    });
  };
})
.controller('RegisterController', function($scope, $location, AuthUser) {
  $scope.user = new AuthUser();

  $scope.create = function(user) {

    if ($scope.userForm.$valid) {
      $scope.user.$save(function(user) {
        $location.path('/');
      });
    }
  };
});
