'use strict';

angular.module('locust.issues', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/issues', {
      templateUrl: 'issues/index.html',
      controller: 'IssuesCtrl'
    })
  }])
  .controller('IssuesCtrl', ['$scope', 'Issue', function($scope, Issue) {
    $scope.issues = Issue.query();
  }]);
