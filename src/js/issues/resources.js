(function(){'use strict';

angular.module('locust.issues')

// Issue
.factory('Issue', ['$resource', function($resource) {
  return $resource(window.apiPath + 'issues/:id', {}, {
    delete: {
      method: 'DELETE',
      params: {
        id: "@id"
      }
    }
  });
}])

// Status
.factory('Status', ['$resource', function($resource) {
    return $resource(window.apiPath + 'statuses/:id');
}]);

})();
