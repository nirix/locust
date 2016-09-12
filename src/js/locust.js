(function(){'use strict';

window.apiPath = 'api.php/';

angular.module('locust', [
  'ui.router',
  'locust.auth',
  'locust.roadmap',
  'locust.issues'
])

// Config
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/roadmap');
}])

// Run
.run(['$state', '$stateParams', '$rootScope', 'AUTH_EVENTS', 'USER_ROLES', 'AuthService', function($state, $stateParams, $rootScope, AUTH_EVENTS, USER_ROLES, AuthService) {
  $rootScope.$state       = $state;
  $rootScope.$stateParams = $stateParams;

  // $rootScope.currentUser  = null;
  $rootScope.userRoles    = USER_ROLES;
  $rootScope.isAuthorised = AuthService.isAuthorised;

  $rootScope.setCurrentUser = function(user) {
    $rootScope.currentUser = user;
  };

  AuthService.getCurrentUser().then(function(user) {
    $rootScope.setCurrentUser(user);
  }, function() {
    $rootScope.currentUser = null;
  });

  $rootScope.$on('$stateChangeStart', function(event, next) {
    // Don't do anything unless 'currentUser' has been set
    if (!angular.isDefined($rootScope.currentUser)) {
      return;
    }

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
}]);

})();
