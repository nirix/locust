'use strict';

angular.module('locust.roadmap', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/roadmap', {
      templateUrl: 'roadmap/index.html',
      controller: 'RoadmapCtrl'
    });

    $routeProvider.when('/roadmap/:versionId', {
      templateUrl: 'roadmap/show.html',
      controller: 'RoadmapDetailCtrl'
    });
  }])
  .controller('RoadmapCtrl', ['$scope', 'Version', function($scope, Version) {
    $scope.versions = Version.query();
    $scope.orderProp = 'display_order';
  }])
  .controller('RoadmapDetailCtrl', ['$scope', '$routeParams', 'Version', function($scope, $routeParams, Version) {
    $scope.version = Version.get({ versionId: $routeParams.versionId });
  }])
