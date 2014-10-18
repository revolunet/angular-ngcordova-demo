
angular.module('FriendGuess.mocks', ['ngCordovaMocks'])

.run(function($rootScope, $http, $cordovaContacts) {
    // $rootScope variable needed beause i don't use ngRoute/ui-router in this example and thus no route resolver.
    $rootScope.mocksLoaded = $http.get('mocks/mocks-contacts.json').then(function(response) {
        $cordovaContacts.contacts = response.data;
    });
});
