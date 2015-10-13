$(document).ready(function(){
    $(".button-collapse").sideNav();
});

(function($){

    var app = angular.module('app', ['ngRoute']);

    app.config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl : 'views/home.html',
                controller : 'homeCtrl'
            })
            .when('/meteo', {
                templateUrl : 'views/meteo.html',
                controller : 'meteoCtrl'
            })
            .otherwise({redirectTo : '/'});
    }]);

    app.controller('homeCtrl', ['$scope', function($scope){
        $scope.todos = [
            {
                name: 'test de demarrage',
                check: false
            }
        ];

        $scope.add = function(){
            $scope.todos.push({
                name : $scope.new,
                check : false
            });
            $scope.new = "";
        };

        $scope.checked = function(value,index){

            value.check = !value.check;
            $scope.todos[index] = value;
        };

        $scope.remove = function(index){
           $scope.todos.splice(index, 1);
        };
    }]);

    app.controller('meteoCtrl', ['$scope', '$http', function($scope, $http){
        $scope.load = true ;
        $scope.list = false ;

        var url = "http://api.openweathermap.org/data/2.5/forecast/daily?q=Paris&mode=json&units=metric&cnt=10&appid=ae926d29f3a41f936bfc04f8547339d5";

        $scope.ville = {name : "Paris"} ;

        $http.get(url)
            .success(function(response){
                $scope.load = false ;
                $scope.list = true ;

                $scope.datas = response ;
            })
            .error(function(){
                $scope.load = false ;
                alert("impossible de recuperer les informations");
            });

        $scope.search = function(ville){
            $scope.load = false ;
            $scope.list = true ;

            var ville = ville.name ;
            var url = "http://api.openweathermap.org/data/2.5/forecast/daily?q="+ ville +"&mode=json&units=metric&cnt=10&appid=ae926d29f3a41f936bfc04f8547339d5";

            $http.get(url)
                .success(function(response){
                    $scope.load = false ;
                    $scope.list = true ;

                    $scope.datas = response ;
                    console.log($scope.datas);
                })
                .error(function(){
                    $scope.load = false ;
                    alert("impossible de recuperer les informations");
                });
        };
    }]);

    app.directive('checked', function(){
        return {
            restrict: 'A',
            scope: {
                checked : '=checked'
            },
            link : function(scope, element, attrs){

                scope.$watch('checked',function() {
                    if(scope.checked == true){
                        element.addClass('grey-text');
                        element.css({"text-decoration" : "line-through"});
                    }
                   else{
                        element.removeClass('grey-text');
                        element.css({"text-decoration" : "none"});
                    }
                });
            }
        }
    })

})(jQuery);