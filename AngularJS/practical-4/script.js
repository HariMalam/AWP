var app = angular.module('myApp', []);
app.controller('StudentController', function($scope) {
    $scope.students = [
        { enrolment: '210160116051', name: 'Hari', semester: '6', branch: 'I.T.' },
        { enrolment: '210160116052', name: 'Tirth', semester: '6', branch: 'CE' },
    ];

    $scope.sortColumn = '';
    $scope.reverseSort = false;

    $scope.sortBy = function(column) {
        if ($scope.sortColumn === column) {
            $scope.reverseSort = !$scope.reverseSort;
        } else {
            $scope.reverseSort = false;
        }
        $scope.sortColumn = column;
    };
});