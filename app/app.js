'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.controllers',
  'myApp.services',
  'ngNotify',
  'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/food-list.html',
    controller: 'FoodListCtrl'});

  $routeProvider.when('/food/:foodId',
    {templateUrl: 'partials/food-report.html',
    controller: 'FoodReportCtrl'});

  $routeProvider.when('/favorite',
    {templateUrl: 'partials/food-favorite.html',
    controller: 'FoodFavoriteCtrl'});

  $routeProvider.otherwise({redirectTo: '/'});

}]);
