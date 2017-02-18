

Player.Weapons.Icestorm = function (target,index,isLast,player) {

			//console.log(target)

		Phaser.Sprite.call(this, protoGame.Game.game,target.x, -150, "iceBig");

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


Player.Weapons.Icestorm.prototype = Object.create(Phaser.Sprite.prototype);
Player.Weapons.Icestorm.prototype.constructor = Player.Weapons.Icestorm;

Player.Weapons.Icestorm.prototype.start = function() {

this.anim.play();
this.x=this.target.x;
protoGame.Game.game.add.tween(this).to( {y:this.target.y}, 1000, Phaser.Easing.Quadratic.In, true, 0)
			.onComplete.add(function(){ 

				protoGame.Game.playingLevel.shake();

				this.removeWeapon(); }, this);



 };



Player.Weapons.Icestorm.prototype.swarm = function() { 

var _sprite;
for(var i=0; i<10; i++){

_sprite=protoGame.Game.game.add.sprite(this.target.x+(protoGame.Game.game.rnd.integerInRange(-20, +20)),-100, 'iceSmall');
_sprite.frame=4;
_sprite.angle=90;
_sprite.anchor.set(0.5,1);
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

Player.Weapons.Icestorm.prototype.removeWeapon = function(_obj) { 


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




