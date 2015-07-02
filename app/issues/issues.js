'use strict';

angular.module('locust.issues', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/issues', {
      templateUrl: 'issues/index.html',
      controller: 'IssuesCtrl'
    });

    $routeProvider.when('/issues/new', {
      templateUrl: 'issues/new.html',
      controller: 'NewIssueCtrl'
    });

    $routeProvider.when('/issues/:issueId', {
      templateUrl: 'issues/show.html',
      controller: 'IssueDetailCtrl'
    })
  }])
  .controller('IssuesCtrl', ['$scope', 'Issue', function($scope, Issue) {
    $scope.issues = Issue.query();
  }])
  .controller('NewIssueCtrl', ['$scope', '$location', 'Issue', function($scope, $location, Issue){
    $scope.issue = new Issue();

    $scope.create = function(issue) {
      $scope.issue.$save(function(issue) {
        $location.path('/issues/' + issue.id);
      });
    };
  }])
  .controller('IssuesDetailCtrl', ['$scope', '$routeParams', '$location', 'Issue', function($scope, $routeParams, $location, Issue) {
    $scope.issue = Issue.get({ issueId: $routeParams.issueId });
    $scope.delete = function() {
      $scope.issue.$delete(function() {
        $location.path('/issues');
      });
    };
  }]);
