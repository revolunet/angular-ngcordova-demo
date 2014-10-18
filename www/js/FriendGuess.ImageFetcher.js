angular.module('FriendGuess.ImageFetcher', [])

.service('ImageFetcher', function($q) {

    return function(url) {
        var deffered = $q.defer(),
            imageObj = new Image();

        imageObj.onload = function() {
            deffered.resolve(imageObj);
        };
        imageObj.onerror = function() {
            deffered.reject(imageObj);
        };

        imageObj.src = url;

        return deffered.promise;
    };

});
