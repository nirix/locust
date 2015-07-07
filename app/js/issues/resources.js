(function(){'use strict';

angular.module('locust.issues')

// Issue
.factory('Issue', function($resource) {
  return $resource(window.apiPath + 'issues/:id.json', {}, {
    delete: {
      method: 'DELETE',
      params: {
        id: "@id"
      }
    }
  });
})

// Status
.factory('Status', function($resource) {
    return $resource(window.apiPath + 'statuses/:id.json');
});

})();
