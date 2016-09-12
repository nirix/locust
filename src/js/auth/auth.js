(function(){'use strict';

angular.module('locust.auth', ['ui.router', 'ngResource'])

// Config
.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    // Login
    .state('login', {
      url: '/login',
      templateUrl: 'assets/views/auth/login.html'
    })

    // Logout
    .state('logout', {
      url: '/logout',
      template: 'Goodbye',
      controller: ['$rootScope', '$scope', '$location', 'AuthService', 'AUTH_EVENTS', function($rootScope, $scope, $location, AuthService, AUTH_EVENTS) {
        AuthService.logout().then(function(){
          $scope.setCurrentUser(null);
          $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
          $location.path('/');
        });
      }]
    })

    // Register
    .state('register', {
      url: '/register',
      templateUrl: 'assets/views/auth/register.html'
    });
}])

// Login controller
.controller('LoginController', ['$scope', '$rootScope', '$location', 'AUTH_EVENTS', 'AuthService', function($scope, $rootScope, $location, AUTH_EVENTS, AuthService) {
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
}])

// Registration controller
.controller('RegisterController', ['$scope', '$location', 'AuthUser', function($scope, $location, AuthUser) {
  $scope.user = new AuthUser();

  $scope.create = function(user) {

    if ($scope.userForm.$valid) {
      $scope.user.$save(function(user) {
        $location.path('/');
      });
    }
  };
}]);

})();
