angular.module('validationApp', [])
.controller('FormController', function ($scope) {
    $scope.submitForm = function () {
        if ($scope.myForm.$valid) {
            console.log('Form submitted successfully!');
        }
    };
});