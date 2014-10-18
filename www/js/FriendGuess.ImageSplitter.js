angular.module('FriendGuess.ImageSplitter', [])

.service('ImageSplitter', function($q, $window, $document) {
    // stretch image to screen size and build tiles
    return function(image, nbTiles) {
        var canvas = $document[0].createElement('canvas'),
            ctx = canvas.getContext('2d'),
            imageWidth = 128,
            winWidth = $window.innerWidth,
            winHeight = $window.innerHeight,
            tileWidth = winWidth / nbTiles,
            tileHeight = winHeight / nbTiles;

        nbTiles = nbTiles || 4;

        var parts = [];
        var imageData, tmpCanvas, tmpCtx;
        ctx.canvas.width  = winWidth;
        ctx.canvas.height = winHeight;
        ctx.drawImage(image, 0, 0, winWidth, winHeight);
        for(var i=0; i<nbTiles; i++)
        {
          for(var j=0; j<nbTiles; j++)
          {
            // extract tile data as base64
            imageData = ctx.getImageData(j*tileWidth, i*tileHeight, tileWidth, tileHeight);
            tmpCanvas = $document[0].createElement('canvas');
            tmpCtx = tmpCanvas.getContext('2d');
            tmpCtx.canvas.width = tileWidth;
            tmpCtx.canvas.height = tileHeight;
            tmpCtx.putImageData(imageData, 0, 0);
            parts.push(tmpCanvas.toDataURL('image/png'));
          }
        }
        return $q.when(parts);
    };
});
