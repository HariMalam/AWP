const app = angular.module('myApp', []);
app.controller('StudentController', ($scope) => {
    $scope.students = [
        { enrolment: '210160116051', name: 'Hari', semester: '6', branch: 'I.T.' },
        { enrolment: '210160116052', name: 'Tirth', semester: '6', branch: 'CE' },
    ];
});