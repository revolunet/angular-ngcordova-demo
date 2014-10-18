
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

.controller('FriendGuessCtrl', function($scope, $timeout, $window, $http, $filter, getFriendsTiles, FriendGuessConfig) {
    var nbPictures = FriendGuessConfig.contacts,
        byLine = FriendGuessConfig.cellsByLine,
        validContacts,
        i;

    $scope.byLine = byLine;

    Array.prototype.AllValuesSame = function(){
        if(this.length > 0) {
            for(var i = 1; i < this.length; i++)
            {
                if(this[i] !== this[0])
                    return false;
            }
        }
        return true;
    };

    function checkStatus() {
        // check if tiles completed
        var ids = [];
        var same = true;
        // compute selected tiles contactIds
        for (i = 0; i < byLine * byLine; i++) {
            var scope = angular.element(document.querySelector('#tile-' + i)).scope();
            ids.push(scope.part[scope.index].contact.id);
        }
        // display message + restart on complete
        if (ids.AllValuesSame()) {
            var contact = validContacts[ids[0]];
            // wait animation end before display result
            $timeout(function() {
                var sure = $window.confirm('Call ' + contact.displayName + ' now ?');
                if (sure) {
                    // dummy    
                }
                refreshContacts();
            }, 500);
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
        $scope.parts = [];

        getFriendsTiles(nbPictures, byLine).then(function(result) {
            validContacts = result.contacts;
            $scope.parts = result.parts;
        });

    }

    if ($scope.mocksLoaded!==undefined) {
        $scope.mocksLoaded.then(function() {
            refreshContacts();
        });
    } else {
        refreshContacts();
    }

});
