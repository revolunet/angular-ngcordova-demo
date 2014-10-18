
angular.module('ngCordovaBrowserMocks', ['ngCordovaMocks'])

.run(function($rootScope, $http, $cordovaContacts) {
    $rootScope.mocksLoaded = $http.get('mocks-contacts.json').then(function(response) {
        $cordovaContacts.contacts = response.data;
    });
});
