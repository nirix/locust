'use strict';

angular.module('locust.issues')
.factory('Issue', function($resource) {
  return $resource(window.apiPath + 'issues/:id.json', {}, {
    delete: {
      method: 'DELETE',
      params: {
        id: "@id"
      }
    }
  });
});
