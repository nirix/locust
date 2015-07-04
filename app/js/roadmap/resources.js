'use strict';

angular.module('locust.roadmap')
.factory('Version', function($resource) {
  return $resource(window.apiPath + 'roadmap/:slug.json', {}, {
    delete: {
      method: 'DELETE',
      params: {
        slug: "@slug"
      }
    }
  });
});
