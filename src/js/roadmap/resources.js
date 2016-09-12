(function(){'use strict';

angular.module('locust.roadmap')
.factory('Version', ['$resource', function($resource) {
  return $resource(window.apiPath + 'roadmap/:slug', {}, {
    delete: {
      method: 'DELETE',
      params: {
        slug: "@slug"
      }
    }
  });
}]);

})();
