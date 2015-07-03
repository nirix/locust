'use strict';

angular.module('locust.issues', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider, USER_ROLES) {
  $stateProvider

  // Issues index
  .state('issues', {
    url: '/issues',
    templateUrl: 'issues/index.html',
    controller: 'IssuesCtrl'
  })

  // New issue
  .state('new-issue', {
    url: '/issues/new',
    templateUrl: 'issues/new.html',
    controller: 'NewIssueCtrl',
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
    templateUrl: 'issues/show.html',
    controller: 'IssueDetailCtrl'
  });
})

// Issues index controller
.controller('IssuesCtrl', function($scope, Issue) {
  $scope.issues = Issue.query();
})

// New issue controller
.controller('NewIssueCtrl', function($state, $scope, Issue){
  $scope.issue = new Issue();

  $scope.create = function(issue) {
    if ($scope.issueForm.$valid) {
      $scope.issue.$save(function(issue) {
        $state.go('issue-detail', { id: issue.id });
      });
    }
  };
})

// Show issue controller
.controller('IssueDetailCtrl', function($scope, $location, Issue) {
  $scope.issue = Issue.get({ id: $scope.$stateParams.id });
  $scope.delete = function() {
    $scope.issue.$delete(function() {
      $location.path('/issues');
    });
  };
});
