
var dependencies = [
    'ngCordova',
    'ngAnimate',
    'FriendGuess.core'
];

if (!window.cordova) {
    dependencies.push('FriendGuess.mocks');
}

angular.module('FriendGuess', dependencies);




if (!window.cordova) {
    angular.bootstrap(document, ['FriendGuess']);
} else {
    document.addEventListener("deviceready", function() {
        angular.bootstrap(document, ['FriendGuess']);
    }, false);
}
