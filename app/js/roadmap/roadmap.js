(function(){'use strict';

angular.module('locust.roadmap', ['ui.router', 'ngResource'])

// Config
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    // Roadmap index
    .state('roadmap', {
      url: '/roadmap',
      templateUrl: 'views/roadmap/index.html'
    })

    // Show version
    .state('roadmap-detail', {
      url: '/roadmap/:slug',
      templateUrl: 'views/roadmap/show.html'
    });
})

// Roadmap index controller
.controller('RoadmapController', function($scope, Version) {
  $scope.versions = Version.query();
  $scope.orderProp = 'display_order';
})

// New version controller
.controller('NewVersionController', function($state, $rootScope, $scope, Version){
  $scope.version = new Version();

  $scope.create = function(version) {
    if ($scope.versionForm.$valid) {
      $scope.version.$save(function(version) {
        $scope.versions.push(version);
        $('#newVersionModal').modal('hide');
      });
    }
  };
})

// Show version controller
.controller('RoadmapDetailController', function($scope, $state, Version) {
  $scope.version = Version.get({ slug: $scope.$stateParams.slug });

  $scope.delete = function() {
    $scope.version.$delete(function() {
      $state.go('roadmap');
    });
  };
});

})();
