
var protoGame = protoGame || {};

protoGame.Game.effects={



    lightning:{

    lightningBitmap:null,
    lightning:null,

        createLightning:function(startX,startY,endX,endY){

            this.lightningBitmap = protoGame.Game.game.add.bitmapData(200, 1000);
            this.lightning = protoGame.Game.game.add.image(startX, startY, this.lightningBitmap);

            this.lightning.anchor.setTo(0.5, 0);
            this.lightning.filters = [ protoGame.Game.game.add.filter('Glow') ];
            this.lightning.rotation =
                protoGame.Game.game.math.degToRad(90-protoGame.Game.game.math.radToDeg( protoGame.Game.game.math.angleBetween(
                    startX, startY,
                    endX, endY
                )))*-1;

            var distance = protoGame.Game.game.math.distance(startX, startY, endX, endY);

          console.log(distance)

             this.createLightningTexture(this.lightningBitmap,this.lightningBitmap.width/2, 0, 20, 3, false, distance);


        },


         createLightningTexture : function(lightningBitmap,x, y, segments, boltWidth, branch, distance) {
                // Get the canvas drawing context for the lightningBitmap
                var ctx = lightningBitmap.context;
                var width = lightningBitmap.width;
                var height = lightningBitmap.height;

                // Our lightning will be made up of several line segments starting at
                // the center of the top edge of the bitmap and ending at the target.

                // Clear the canvas
                if (!branch) ctx.clearRect(0, 0, width, height);

                // Draw each of the segments
                for(var i = 0; i < segments; i++) {
                    // Set the lightning color and bolt width
                    ctx.strokeStyle = 'rgb(255, 255, 255)';
                    ctx.lineWidth = boltWidth;
                    ctx.beginPath();
                    ctx.moveTo(x, y);

                    // Calculate an x offset from the end of the last line segment and
                    // keep it within the bounds of the bitmap
                    if (branch) {
                        // For a branch
                        x += protoGame.Game.game.rnd.integerInRange(-10, 10);
                    } else {
                        // For the main bolt
                        x += protoGame.Game.game.rnd.integerInRange(-30, 30);
                    }
                    if (x <= 10) x = 10;
                    if (x >= width-10) x = width-10;

                    // Calculate a y offset from the end of the last line segment.
                    // When we've reached the target or there are no more segments left,
                    // set the y position to the distance to the target. For branches, we
                    // don't care if they reach the target so don't set the last coordinate
                    // to the target if it's hanging in the air.
                    if (branch) {
                        // For a branch
                        y += protoGame.Game.game.rnd.integerInRange(10, 20);
                    } else {
                        // For the main bolt
                        y += protoGame.Game.game.rnd.integerInRange(20, distance/segments);
                    }
                    if ((!branch && i == segments - 1) || y > distance) {
                        // This causes the bolt to always terminate at the center
                        // lightning bolt bounding box at the correct distance to
                        // the target. Because of the way the lightning sprite is
                        // rotated, this causes this point to be exactly where the
                        // player clicked or tapped.
                        y = distance;
                        if (!branch) x = width/2;
                    }

                    // Draw the line segment
                    ctx.lineTo(x, y);
                    ctx.stroke();

                    // Quit when we've reached the target
                    if (y >= distance) break;

                    // Draw a branch 20% of the time off the main bolt only
                    if (!branch) {
                        
                        
                        if (this.chanceRoll(20)) {
                            // Draws another, thinner, bolt starting from this position
                            this.createLightningTexture(lightningBitmap, x, y, 20, 1, true, distance);
                        }
                    }
                }

                // This just tells the engine it should update the texture cache
                lightningBitmap.dirty = true;

                protoGame.Game.game.add.tween(this.lightning)
                .to({ alpha: 0.5 }, 100, Phaser.Easing.Bounce.Out)
                .to({ alpha: 1.0 }, 100, Phaser.Easing.Bounce.Out)
                .to({ alpha: 0.5 }, 100, Phaser.Easing.Bounce.Out)
                .to({ alpha: 1.0 }, 100, Phaser.Easing.Bounce.Out)
                .to({ alpha: 0}, 250, Phaser.Easing.Bounce.In,false,400)
                .start()

            
                
                
       

},

 chanceRoll: function (chance) {
        if (chance === undefined) { chance = 50; }
        return chance > 0 && (Math.random() * 100 <= chance);
    }
    

}



    }
   




// Fragment shaders are small programs that run on the graphics card and alter
// the pixels of a texture. Every framework implements shaders differently but
// the concept is the same. This shader takes the lightning texture and alters
// the pixels so that it appears to be glowing. Shader programming itself is
// beyond the scope of this tutorial.
//
// There are a ton of good resources out there to learn it. Odds are that your
// framework already includes many of the most popular shaders out of the box.
//
// This is an OpenGL/WebGL feature. Because it runs in your web browser
// you need a browser that support WebGL for this to work.
Phaser.Filter.Glow = function (game) {
    Phaser.Filter.call(this, game);

    this.fragmentSrc = [
        "precision lowp float;",
        "varying vec2 vTextureCoord;",
        "varying vec4 vColor;",
        'uniform sampler2D uSampler;',

        'void main() {',
            'vec4 sum = vec4(0);',
            'vec2 texcoord = vTextureCoord;',
            'for(int xx = -4; xx <= 4; xx++) {',
                'for(int yy = -3; yy <= 3; yy++) {',
                    'float dist = sqrt(float(xx*xx) + float(yy*yy));',
                    'float factor = 0.0;',
                    'if (dist == 0.0) {',
                        'factor = 2.0;',
                    '} else {',
                        'factor = 2.0/abs(float(dist));',
                    '}',
                    'sum += texture2D(uSampler, texcoord + vec2(xx, yy) * 0.002) * factor;',
                '}',
            '}',
            'gl_FragColor = sum * 0.025 + texture2D(uSampler, texcoord);',
        '}'
    ];
};

Phaser.Filter.Glow.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.Glow.prototype.constructor = Phaser.Filter.Glow;