var app = angular.module('myApp', []);

app.controller('myCtrl', function ($scope, $http) {
    $http.get("Customers.php").then(function (response) {
        $scope.customers = response.data;
    });
});