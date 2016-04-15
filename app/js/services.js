'use strict';
angular.module('myApp.services', [])
.value('version', '0.1')
.constant('API_KEY', 'kYG1cxnbwBToS50GpDTkVS0GFuC5t0R6WCtncCeM')
.constant('BASE_URL', 'http://api.nal.usda.gov/ndb/')
.factory('foodFactory', ['$http', 'API_KEY', 'BASE_URL',
  function($http, API_KEY, BASE_URL) {
    return {
        getFood:function(searchWord, cant) {
          // example URL = http://api.nal.usda.gov/ndb/search/?format=xml&q=butter&max=25&offset=0&api_key=DEMO_KEY
          var action = 'search/';
          var options = '?format=json&max=' + cant +
            '&offset=0';
          var searchParam = '&q=' + searchWord;
          var apikeyParam = '&api_key=' + API_KEY;
          var finalUrl = BASE_URL + action + options +
            searchParam + apikeyParam;
          return $http.get(finalUrl);
        },
        getFoodReport:function(foodId) {
          // example url = http://api.nal.usda.gov/ndb/reports/?ndbno=01009&type=b&format=xml&api_key=DEMO_KEY
          var action = 'reports/';
          var foodId = '?ndbno=' + foodId;
          var options = '&type=b&format=json';
          var apikeyParam = '&api_key=' + API_KEY;
          var finalUrl = BASE_URL + action + foodId +
            options + apikeyParam;
          return $http.get(finalUrl);
        }
    }
}])
