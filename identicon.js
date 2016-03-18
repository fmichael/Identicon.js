/**
 * Identicon.js - Michael Ferguson
 * Small Library to generate unsername based identicons using various shapes & colours
 */

/*
	Copyright 2015 Michael Ferguson

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/


(function() {
    Identicon = function(size, hashCode, shape, amount, bgColor, colors){
        this.size     = size    || 64;
        this.hashCode = hashCode|| 0;
        this.shape    = shape   || 'any';
        this.amount   = amount  || 2;
        this.bgColor  = bgColor || '#364760';
        this.colors   = colors  || ['rgba(181, 159, 219, 0.75)',
                                   'rgba(129, 187, 236, 0.75)',
                                   'rgba(114, 202, 149, 0.75)',
                                   'rgba(240, 123, 138, 0.75)',
                                   'rgba(248, 174, 70,  0.75)',
                                   'rgba(132, 138, 159, 0.75)',
                                   'rgba(244, 154, 130, 0.75)'];
    };

    Identicon.prototype = {
        size: null,
        shape: null,
        bgColor: null,
        colors: null,
        amount: null,

        render: function(){
            var size      = this.size,
                hashCode  = this.hashCode,
                shape     = this.shape,
                bgColor   = this.bgColor,
                colors    = this.colors,
                amount    = this.amount,
                image     = document.createElement('canvas'),
                ctx       = image.getContext('2d'),
                positions = [];

            Math.seed = hashCode;

            image.width  = size;
            image.height = size;

            switch(shape) {
                case 'any': shape = "Math.floor(Math.sRandom()*3)"; break;
                case 'squares':
                case 'square': shape = "2"; break;
                case 'diamonds':
                case 'diamond': shape = "1"; break;
                case 'circles':
                case 'circle':
                default: shape = "0";
            }

            for(var deg = 0; deg < 360; deg+=45) {
                positions.push([(image.width/2) + (image.width/2) * Math.cos(deg * (Math.PI / 180)), (image.height/2) + (image.height/2) * Math.sin(deg * (Math.PI / 180))]);
            }

            if(amount > colors.length || amount > positions.length) {
                console.error('Cannot generate more entities than colors or positions to draw');
                return;
            }

            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, image.width, image.height);

            for(var x = 0; x < amount; x++) {
                var position = positions.splice(Math.floor(Math.sRandom()*positions.length), 1)[0];
                var color = colors.splice(Math.floor(Math.sRandom()*colors.length), 1)[0];

                ctx.beginPath();
                ctx.fillStyle = color;

                var shapeType = eval(shape);
                if(shapeType == 0) {
                    ctx.arc(position[0], position[1], image.width/2, 0, 360);
                }
                else if(shapeType == 1) {
                    ctx.moveTo(position[0]-image.width/2, position[1]);
                    ctx.lineTo(position[0], position[1]-image.height/2);
                    ctx.lineTo(position[0]+image.width/2, position[1]);
                    ctx.lineTo(position[0], position[1]+image.height/2);
                    ctx.lineTo(position[0]-image.width/2, position[1]);
                }
                else if(shapeType == 2) {
                    ctx.moveTo(position[0]-image.width/2, position[1]-image.height/2);
                    ctx.lineTo(position[0]+image.width/2, position[1]-image.height/2);
                    ctx.lineTo(position[0]+image.width/2, position[1]+image.height/2);
                    ctx.lineTo(position[0]-image.width/2, position[1]+image.height/2);
                    ctx.lineTo(position[0]-image.width/2, position[1]-image.height/2);
                }

                ctx.closePath();
                ctx.fill();
            }

            return image.toDataURL('image/png');
        },

        toString: function(){
            return this.render();
        }
    };

    window.Identicon = Identicon;
})();

String.prototype.hashCode = function() {
    var hash = 0, i, chr, len;
    if (this.length == 0) return hash;
    for (i = 0, len = this.length; i < len; i++) {
        chr   = this.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
	}
    return hash;
};

Math.sRandom = function(max, min) {
    max = max || 1;
    min = min || 0;
    Math.seed = Math.abs(Math.seed) || Math.random();
	
    Math.seed = (Math.seed * 9301 + 49297) % 233280;
    var rnd = Math.seed / 233280;
	
    return min + rnd * (max - min);
};
