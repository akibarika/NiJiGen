/**
 * Created by akibarika on 8/08/15.
 */
var myControllers = angular.module('myControllers',[]);

myControllers.constructor('indexContrl',['$scope', function ($scope) {
    $scope.name = "Rika";
}])