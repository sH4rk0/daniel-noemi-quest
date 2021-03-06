

Player.Weapons.Firestorm = function (target,index,isLast,player) {

            //console.log(target)

        Phaser.Sprite.call(this, protoGame.Game.game,target.x, -150, "iceSword");

                this.anchor.set(.5);
                this.damage=target.damage;
                this.target=target.target;
                this.isLast=isLast;
                this.player=player;
                this.swarm();

                this.player.play('attack').onComplete.removeAll();
                this.player.play('attack');

                this.anim=this.animations.add('anim', [0,1,2,3], 10, true);
                
                groupPlayersWeapons.add(this);

};

Player.Weapons.Firestorm.prototype.lightningBitmap=null;
Player.Weapons.Firestorm.prototype.lightning=null;

Player.Weapons.Firestorm.prototype = Object.create(Phaser.Sprite.prototype);
Player.Weapons.Firestorm.prototype.constructor = Player.Weapons.Firestorm;

Player.Weapons.Firestorm.prototype.start = function() {

this.createLightning(this.target.x, 0, this.target.x, this.target.y);

 };

Player.Weapons.Firestorm.prototype.createLightning = function(startX,startY,endX,endY){


    //console.log(startX,startY,endX,endY);

            this.lightningBitmap = protoGame.Game.game.add.bitmapData(200, 1000);
            this.lightning = protoGame.Game.game.add.image(startX, startY, this.lightningBitmap);

            this.lightning.anchor.setTo(0.5, 0);
            this.lightning.filters = [ protoGame.Game.game.add.filter('Glow') ];
            this.lightning.rotation =
                protoGame.Game.game.math.degToRad(90-protoGame.Game.game.math.radToDeg( protoGame.Game.game.math.angleBetween(
                    startX, startY,
                    endX, endY
                )))*-1;

            var distance = protoGame.Game.game.math.distance(startX, startY, endX, endY+this.target.height/2);
            this.createLightningTexture(this.lightningBitmap,this.lightningBitmap.width/2, 0, 1, 50, false, distance);

            protoGame.Game.playingLevel.shake();
             var tween = protoGame.Game.game.add.tween(this.lightning)
                .to({ alpha: 0.5 }, 100, Phaser.Easing.Bounce.Out)
                .to({ alpha: 1.0 }, 100, Phaser.Easing.Bounce.Out)
                .to({ alpha: 0.5 }, 100, Phaser.Easing.Bounce.Out)
                .to({ alpha: 1.0 }, 100, Phaser.Easing.Bounce.Out)
                .to({ alpha: 0}, 100, Phaser.Easing.Bounce.Out)
                .start();

            var _zot=protoGame.Game.game.add.sprite(startX,endY, 'fireGround');
            var anim = _zot.animations.add('zot', [0,1,2,3,4,5,6,7,8,9,10,11], 8, false);
            _zot.play('zot');
            _zot.anchor.set(.5);
            _zot.scale.set(2);
            anim.onComplete.add(function(zot){ zot.kill(); zot.destroy();},_zot)

              tween.onComplete.add(function(){ this.removeWeapon();},this )  
             


        };


 Player.Weapons.Firestorm.prototype.createLightningTexture = function(lightningBitmap,x, y, segments, boltWidth, branch, distance) {
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
                    
                    
                    
                     grd = ctx.createLinearGradient(0.000, 0.000, 100.000, 0.000);
      
                      // Add colors
                      grd.addColorStop(0.000, 'rgba(0, 0, 0, 1.000)');
                      grd.addColorStop(0.188, 'rgba(0, 0, 0, 1.000)');
                      grd.addColorStop(0.378, 'rgba(0, 0, 0, 1.000)');
                      grd.addColorStop(0.499, 'rgba(0, 0, 0, 1.000)');
                      grd.addColorStop(0.608, 'rgba(0, 0, 0, 1.000)');
                      grd.addColorStop(0.856, 'rgba(255, 0, 0, 1.000)');
                      grd.addColorStop(0.900, 'rgba(255, 110, 2, 1.000)');
                      grd.addColorStop(0.956, 'rgba(255, 255, 255, 1.000)');
                      grd.addColorStop(0.990, 'rgba(255, 110, 2, 1.000)');
                      grd.addColorStop(1.000, 'rgba(255, 0, 0, 1.000)');
                      
                      // Fill with gradient
                      //ctx.fillStyle = grd;


                    ctx.strokeStyle = grd
                    ctx.lineWidth = boltWidth;
                    ctx.beginPath();
                    ctx.moveTo(x, y);


                        x += protoGame.Game.game.rnd.integerInRange(-30, 30);
                    
                    if (x <= 10) x = 10;
                    if (x >= width-10) x = width-10;

                   
                        y += protoGame.Game.game.rnd.integerInRange(20, distance/segments);
                  
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

                }

                // This just tells the engine it should update the texture cache
                lightningBitmap.dirty = true;

                
      

};



Player.Weapons.Firestorm.prototype.swarm = function() { 

var _sprite;
for(var i=0; i<10; i++){

_sprite=protoGame.Game.game.add.sprite(this.target.x+(protoGame.Game.game.rnd.integerInRange(-20, +20)),-100, 'fireSmall');
_sprite.animations.add('zot', [0,1,2], 10, true)
_sprite.play('zot');

_sprite.anchor.set(.5);
_sprite.angle=-90;
_sprite.spell=this;
_sprite.index=i;

protoGame.Game.game.add.tween(_sprite).to( {y:this.target.y}, 500, Phaser.Easing.Quadratic.In, true, i*(protoGame.Game.game.rnd.integerInRange(50, 200)))
            .onComplete.add(function(_sprite){ 

                
                if(this.index==9){this.spell.start();} 
                this.kill();
                this.spell.target.play("hit");
            }, _sprite);

}



};

Player.Weapons.Firestorm.prototype.removeWeapon = function() { 


            var _style={fill: '#ffffff', fontSize: 40, stroke:'#ff0000', strokeThickness:10};
            _diceBonus = protoGame.Game.game.add.text(this.x, this.y,  "-"+this.damage, _style);
            _diceBonus.font = 'Press Start 2P';
            _diceBonus.anchor.set(.5);

            protoGame.Game.game.add.tween(_diceBonus).to( {y:this.y-40,alpha:0}, 500, Phaser.Easing.Quadratic.InOut, true, 0)
            .onComplete.add(function(_text){ _text.kill(); }, this);
            

        if(this.isLast){  
            this.player.play('idle');
            protoGame.Game.game.time.events.add(1000, protoGame.Game.action.stopPlayerAction,this);
             }

        this.target.damage(this.damage);
             
        this.kill();
        this.destroy();

};




