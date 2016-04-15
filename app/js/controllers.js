'use strict';
angular.module('myApp.controllers', [])
.controller('FoodListCtrl', ['$scope', 'foodFactory', 'ngNotify',
    function($scope, foodFactory, ngNotify) {

    $scope.loadFood = function(searchWord, cant) {
      foodFactory.getFood(searchWord, cant).then(
        function(response) {

          $scope.foodArray = response.data.list.item;

        },
        function(response) {
          // error message
          console.log('Error: ');
          console.log(response);
          ngNotify.set('No data found for word \'' + searchWord + '\' :(', {type: 'error'});
        }
      )
    };


    $scope.favorite = function(foodData) {
      var foodArray = JSON.parse(localStorage.getItem('session')) || [];
      if (findById(foodArray, foodData.ndbno)) {
        foodArray.push(foodData);
        localStorage.setItem('session', JSON.stringify(foodArray));
        ngNotify.set('Favorited <3 !!', {type:'success'});
      } else {
        ngNotify.set('Already in your favorites list :)', {type: 'warn'});
      }

    };

    function findById(source, id) {
      for (var i = 0; i < source.length; i++) {
        if (source[i].ndbno === id) {
          return false;
        }
      }
      return true;
    }


    $scope.cantOptions = [
      { name: '25', value: '25' },
      { name: '50', value: '50' },
      { name: '100', value: '100' }
    ];


    $scope.cant = $scope.cantOptions[0].value;

    }
])
.controller('FoodReportCtrl', ['$scope', 'foodFactory', '$routeParams',
  function($scope, foodFactory, $routeParams) {
    $scope.foodId = $routeParams.foodId;


    $scope.loadFoodReport = function(foodId) {
      foodFactory.getFoodReport(foodId).then(
        function(response) {
          $scope.foodName = response.data.report.food.name;
          $scope.foodNutrients = response.data.report.food.nutrients;
        },
        function(response) {
          // error message
          console.log('Error: ');
          console.log(response);
        }
      )
    };


    $scope.loadFoodReport($scope.foodId);
  }
])
.controller('FoodFavoriteCtrl', ['$scope', 'ngNotify',
  function($scope, ngNotify) {
      $scope.loadFavorites = function() {
        var retrievedObject = localStorage.getItem('session');
        $scope.foodFavorite = JSON.parse(retrievedObject);
      }

      $scope.loadFavorites();

      $scope.unfavorite = function(foodDataId) {
        if (deleteById($scope.foodFavorite, foodDataId)) {
          ngNotify.set('Unfavorited </3 !!', {type:'success'});
        } else {
          ngNotify.set('Couldn\'t remove element from favorites.', {type:'warn'});
        }
      }

      function deleteById(source, id) {
        for (var i = 0; i < source.length; i++) {
          if (source[i].ndbno === id) {
            source.splice(i, 1);
            localStorage.setItem('session', JSON.stringify(source));
            return true;
          }
        }
        return false;
      }
  }
])
