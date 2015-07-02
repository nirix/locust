'use strict';

window.apiPath = 'api.php/';

angular.module('locust', [
  'ui.router',
  'locustServices',
  'authServices',
  'locust.auth',
  'locust.roadmap',
  'locust.issues'
])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/roadmap');
}])
.run(['$state', '$stateParams', '$rootScope', 'AUTH_EVENTS', 'AuthService',
      function($state, $stateParams, $rootScope, AUTH_EVENTS, AuthService) {

  $rootScope.$state       = $state;
  $rootScope.$stateParams = $stateParams;

  $rootScope.$on('$stateChangeStart', function(event, next) {
    if (next.data && next.data.authorisedRoles) {
      var authorisedRoles = next.data.authorisedRoles;

      if (!AuthService.isAuthorised(authorisedRoles)) {
        event.preventDefault();

        if (AuthService.isAuthenticated()) {
          $rootScope.$broadcast(AUTH_EVENTS.notAuthorised);
        } else {
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        }

        $state.go('login');
      }
    }
  });
}])
.controller('ApplicationCtrl', ['$scope', '$http', 'USER_ROLES', 'AuthService', function($scope, $http, USER_ROLES, AuthService) {
  $scope.currentUser  = null;
  $scope.userRoles    = USER_ROLES;
  $scope.isAuthorised = AuthService.isAuthorised;

  $scope.setCurrentUser = function(user) {
    $scope.currentUser = user;
  };

  AuthService.getCurrentUser().then(function(user) {
    $scope.setCurrentUser(user);
  });
}]);
