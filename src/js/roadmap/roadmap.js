(function(){'use strict';

angular.module('locust.roadmap', ['ui.router', 'ngResource'])

// Config
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    // Roadmap index
    .state('roadmap', {
      url: '/roadmap',
      templateUrl: 'assets/views/roadmap/index.html'
    })

    // Show version
    .state('roadmap-detail', {
      url: '/roadmap/:slug',
      templateUrl: 'assets/views/roadmap/show.html'
    });
}])

// Roadmap index controller
.controller('RoadmapController', ['$scope', 'Version', function($scope, Version) {
  $scope.versions = Version.query();
  $scope.orderProp = 'display_order';
}])

// New version controller
.controller('NewVersionController', ['$state', '$rootScope', '$scope', 'Version', function($state, $rootScope, $scope, Version){
  $scope.version = new Version();

  $scope.create = function(version) {
    if ($scope.versionForm.$valid) {
      $scope.version.$save(function(version) {
        $scope.versions.push(version);
        $('#newVersionModal').modal('hide');
      });
    }
  };
}])

// Edit version controller
.controller('EditVersionController', ['$state', '$rootScope', '$scope', '$sce', 'Version', function($state, $rootScope, $scope, $sce, Version){
  $scope.version = Version.get({ slug: $scope.$stateParams.slug });

  $scope.update = function(version) {
    if ($scope.versionForm.$valid) {
      version.$save(function(version) {
        $rootScope.version = version;
        $('#editVersionModal').modal('hide');

        // TODO: find a better way to do this
        $rootScope.versionDescription = $sce.trustAsHtml(marked($rootScope.version.description || ''));

        // In case the slug has changed
        $state.go('roadmap-detail', { slug: version.slug });
      });
    }
  };
}])

// Show version controller
.controller('RoadmapDetailController', ['$scope', '$rootScope', '$state', '$sce', 'Version', function($scope, $rootScope, $state, $sce, Version) {
  $rootScope.version = Version.get({ slug: $scope.$stateParams.slug }, function() {
    $rootScope.versionDescription = $sce.trustAsHtml(marked($rootScope.version.description || ''));
  });

  $scope.delete = function() {
    $rootScope.version.$delete(function() {
      $state.go('roadmap');
    });
  };
}]);

})();
