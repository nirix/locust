(function(){'use strict';

angular.module('locust.issues', ['ui.router', 'ngResource'])

// Config
.config(function($stateProvider, $urlRouterProvider, USER_ROLES) {
  $stateProvider
    // Issues index
    .state('issues', {
      url: '/issues',
      templateUrl: 'views/issues/index.html'
    })

    // New issue
    .state('new-issue', {
      url: '/issues/new',
      templateUrl: 'views/issues/new.html',
      data: {
        authorisedRoles: [USER_ROLES.admin, USER_ROLES.user]
      },
      resolve: {
        auth: function(AuthResolver) {
          return AuthResolver.resolve();
        }
      }
    })

    // Show issue
    .state('issue-detail', {
      url: '/issues/:id',
      templateUrl: 'views/issues/show.html'
    });
})

// Issues index controller
.controller('IssuesController', function($scope, Issue) {
  $scope.issues = Issue.query();
})

// New issue controller
.controller('NewIssueController', function($state, $scope, Issue, Version) {
  $scope.versions = Version.query();
  $scope.issue = new Issue();

  $scope.create = function(issue) {
    issue.version_id = issue.version.id;

    if ($scope.issueForm.$valid) {
      $scope.issue.$save(function(issue) {
        $state.go('issue-detail', { id: issue.id });
      });
    }
  };
})

// Show issue controller
.controller('IssueDetailController', function($scope, $location, $sce, Issue) {
  $scope.issue = Issue.get({ id: $scope.$stateParams.id }, function() {
    $scope.issueDescription = $sce.trustAsHtml(marked($scope.issue.description || ''));
  });

  $scope.delete = function() {
    $scope.issue.$delete(function() {
      $location.path('/issues');
    });
  };
});

})();
