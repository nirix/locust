'use strict';

var locustServices = angular.module('locustServices', ['ngResource']);

locustServices.factory('Issue', ['$resource', function($resource) {
  return $resource(window.apiPath + 'issues/:issueId.json', {}, {
    query: {
      method: 'GET',
      isArray: true
    }
  });
}]);

locustServices.factory('Version', ['$resource', function($resource) {
  return $resource(window.apiPath + 'roadmap/:versionId.json', {}, {
    query: {
      method: 'GET',
      isArray: true
    }
  });
}]);
