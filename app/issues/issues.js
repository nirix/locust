'use strict';

angular.module('locust.issues', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/issues', {
      templateUrl: 'issues/index.html',
      controller: 'IssuesCtrl'
    });

    $routeProvider.when('/issues/:issueId', {
      templateUrl: 'issues/show.html',
      controller: 'IssuesDetailCtrl'
    })
  }])
  .controller('IssuesCtrl', ['$scope', 'Issue', function($scope, Issue) {
    $scope.issues = Issue.query();
  }])
  .controller('IssuesDetailCtrl', ['$scope', '$routeParams', 'Issue', function($scope, $routeParams, Issue) {
    $scope.issue = Issue.get({ issueId: $routeParams.issueId });
  }]);
