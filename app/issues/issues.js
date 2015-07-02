'use strict';

angular.module('locust.issues', ['ui.router'])
.config(['$stateProvider', '$urlRouterProvider', 'USER_ROLES',
         function($stateProvider, $urlRouterProvider, USER_ROLES) {
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
    }
  })

  // Show issue
  .state('issue-detail', {
    url: '/issues/:id',
    templateUrl: 'issues/show.html',
    controller: 'IssueDetailCtrl'
  });
}])
.controller('IssuesCtrl', ['$scope', 'Issue', function($scope, Issue) {
  $scope.issues = Issue.query();
}])
.controller('NewIssueCtrl', ['$state', '$scope', 'Issue', function($state, $scope, Issue){
  $scope.issue = new Issue();

  $scope.create = function(issue) {
    if ($scope.issueForm.$valid) {
      $scope.issue.$save(function(issue) {
        $state.go('issue-detail', { id: issue.id });
      });
    }
  };
}])
.controller('IssueDetailCtrl', ['$scope', '$location', 'Issue', function($scope, $location, Issue) {
  $scope.issue = Issue.get({ id: $scope.$stateParams.id });
  $scope.delete = function() {
    $scope.issue.$delete(function() {
      $location.path('/issues');
    });
  };
}]);
