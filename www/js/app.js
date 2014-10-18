
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
