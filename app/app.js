'use strict';

window.apiPath = 'api.php/';

angular.module('locust', [
    'ngRoute',
    'locustServices',
    'locust.roadmap',
    'locust.issues'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({ redirectTo: '/roadmap' });
  }]);
