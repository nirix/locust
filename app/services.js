'use strict';

var locustServices = angular.module('locustServices', ['ngResource']);

// Issues
locustServices.factory('Issue', function($resource) {
  return $resource(window.apiPath + 'issues/:id.json', {}, {
    delete: {
      method: 'DELETE',
      params: {
        id: "@id"
      }
    }
  });
});

// Versions
locustServices.factory('Version', function($resource) {
  return $resource(window.apiPath + 'roadmap/:slug.json');
});
