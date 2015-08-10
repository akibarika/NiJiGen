/**
 * Created by akibarika on 9/08/15.
 */

var myApp = angular.module('myApp',['ngRoute','myControllers']);

// router

myApp.config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/',{
        temlateUrl:'index.ejs',
        controller:'indexContrl'
    }).otherwise({
        redirectTo:'/404'
    });
}]);