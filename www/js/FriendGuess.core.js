
angular.module('FriendGuess.core', [
    'ngCordova',
    'ngAnimate',
    'FriendGuess.ContactsFetcher',
    'FriendGuess.ImageFetcher',
    'FriendGuess.ImageSplitter'
])

.value('FriendGuessConfig', {
    cellsByLine: 3,
    contacts: 5
})

.controller('FriendGuessCtrl', function($scope, $timeout, $window, $http, $filter, getFriendsCells, FriendGuessConfig) {
    var nbPictures = FriendGuessConfig.contacts,
        byLine = FriendGuessConfig.cellsByLine,
        validContacts,
        i;

    $scope.byLine = byLine;

    function checkStatus() {
        // check if tiles completed
        var ids = [];
        var same = true;
        // compute selected tiles contactIds
        for (i = 0; i < byLine * byLine; i++) {
            var scope = angular.element(document.querySelector('#cell-' + i)).scope();
            ids.push(scope.cell[scope.index].contact.id);
        }
        // display message on complete
        if (ids.AllValuesSame()) {
            $scope.winner = validContacts[ids[0]];
        }
    }

    $scope.increment = function(index, max) {
        index++;
        if (index>=max) {
            index = 0;
        }
        $timeout(function() {
            checkStatus();
        }, 0);
        return index;
    };

    function refreshContacts() {
        // refresh contacts and grid
        $scope.cells = [];

        getFriendsCells(nbPictures, byLine).then(function(result) {
            validContacts = result.contacts;
            $scope.cells = result.cells;
        });

    }

    $scope.refreshContacts = refreshContacts;

    if ($scope.mocksLoaded!==undefined) {
        $scope.mocksLoaded.then(function() {
            refreshContacts();
        });
    } else {
        refreshContacts();
    }

});
