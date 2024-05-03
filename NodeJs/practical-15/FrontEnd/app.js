angular.module('libraryApp', [])
    .controller('LibraryController', function($scope, $http) {
        $scope.newBook = {};
        $scope.searchQuery = '';
        $scope.books = [];

        // Function to add a new book
        $scope.addBook = function() {
            $http.post('http://localhost:5000/api/books', $scope.newBook)
                .then(function(response) {
                    console.log('Book added successfully:', response.data);
                    $scope.newBook = {};
                    $scope.fetchBooks();
                })
                .catch(function(error) {
                    console.error('Error adding book:', error);
                });
        };

        $scope.fetchBooks = function() {
            $http.get('http://localhost:5000/api/books')
                .then(function(response) {
                    console.log('Books fetched successfully:', response.data);
                    $scope.books = response.data;
                })
                .catch(function(error) {
                    console.error('Error fetching books:', error);
                });
        };

        $scope.removeBook = function(book) {
            const bookId = book._id;
            $http.delete(`http://localhost:5000/api/books/${bookId}`)
                .then(function(response) {
                    console.log('Book removed successfully:', response.data);
                    $scope.fetchBooks();
                })
                .catch(function(error) {
                    console.error('Error removing book:', error);
                });
        };
        $scope.fetchBooks();
    });
