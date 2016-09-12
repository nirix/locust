(function(){'use strict';

angular.module('locust.issues', ['ui.router', 'ngResource'])

// Config
.config(['$stateProvider', '$urlRouterProvider', 'USER_ROLES', function($stateProvider, $urlRouterProvider, USER_ROLES) {
  $stateProvider
    // Issues index
    .state('issues', {
      url: '/issues',
      templateUrl: 'assets/views/issues/index.html'
    })

    // New issue
    .state('new-issue', {
      url: '/issues/new',
      templateUrl: 'assets/views/issues/new.html',
      data: {
        authorisedRoles: [USER_ROLES.admin, USER_ROLES.user]
      },
      resolve: {
        auth: ['AuthResolver', function(AuthResolver) {
          return AuthResolver.resolve();
        }]
      }
    })

    // Show issue
    .state('issue-detail', {
      url: '/issues/:id',
      templateUrl: 'assets/views/issues/show.html'
    });
}])

// Issues index controller
.controller('IssuesController', ['$scope', 'Issue', function($scope, Issue) {
  $scope.issues = Issue.query();
}])

// New issue controller
.controller('NewIssueController', ['$state', '$scope', 'Issue', 'Version', 'Status', function($state, $scope, Issue, Version, Status) {
  $scope.issue = new Issue();

  $scope.versions = Version.query();
  $scope.statuses = Status.query();

  $scope.create = function(issue) {
    issue.version_id = issue.version.id;
    issue.status_id = issue.status.id;

    if ($scope.issueForm.$valid) {
      $scope.issue.$save(function(issue) {
        $state.go('issue-detail', { id: issue.id });
      });
    }
  };
}])

// Show issue controller
.controller('IssueDetailController', ['$scope', '$location', '$sce', 'Issue', function($scope, $location, $sce, Issue) {
  $scope.issue = Issue.get({ id: $scope.$stateParams.id }, function() {
    $scope.issueDescription = $sce.trustAsHtml(marked($scope.issue.description || ''));
  });

  $scope.delete = function() {
    $scope.issue.$delete(function() {
      $location.path('/issues');
    });
  };
}]);

})();
