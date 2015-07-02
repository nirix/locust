'use strict';

angular.module('locust.roadmap', ['ui.router'])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider

  // Roadmap index
  .state('roadmap', {
    url: '/roadmap',
    templateUrl: 'roadmap/index.html',
    controller: 'RoadmapCtrl'
  })

  // Show version
  .state('roadmap-detail', {
    url: '/roadmap/:slug',
    templateUrl: 'roadmap/show.html',
    controller: 'RoadmapDetailCtrl'
  });
}])
.controller('RoadmapCtrl', ['$scope', 'Version', function($scope, Version) {
  $scope.versions = Version.query();
  $scope.orderProp = 'display_order';
}])
.controller('RoadmapDetailCtrl', ['$scope', 'Version', function($scope, Version) {
  $scope.version = Version.get({ slug: $scope.$stateParams.slug });
}]);
