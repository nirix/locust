(function(){'use strict';

angular.module('locust.roadmap')
.factory('Version', function($resource) {
  return $resource(window.apiPath + 'roadmap/:slug.json', {}, {
    save: {
      method: 'POST',
      params: {
        slug: "@slug"
      }
    },
    delete: {
      method: 'DELETE',
      params: {
        slug: "@slug"
      }
    }
  });
});

})();
