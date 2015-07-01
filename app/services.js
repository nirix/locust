'use strict';

var locustServices = angular.module('locustServices', ['ngResource']);

locustServices.factory('Issue', ['$resource', function($resource) {
  return $resource(window.apiPath + 'issues/:issueId.json', {}, {
    delete: {
      method: 'DELETE',
      params: {
        id: "@id"
      }
    }
  });
}]);

locustServices.factory('Version', ['$resource', function($resource) {
  return $resource(window.apiPath + 'roadmap/:versionId.json');
}]);
