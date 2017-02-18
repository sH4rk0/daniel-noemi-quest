

Player.Weapons.Sword = function (target,index,isLast,player) {

			//console.log(target)

		Phaser.Sprite.call(this, protoGame.Game.game, protoGame.Game.playingLevel.players[protoGame.Game.playingLevel.selectedPlayer].x, protoGame.Game.playingLevel.players[protoGame.Game.playingLevel.selectedPlayer].y, "sword");


				
				var _tween,_anim;

				this.anchor.set(.5);
				this.isLast=isLast;
				this.alpha=0;
				this.damage=target.damage;
				this.target=target.target;
				this.player=player;

			

				//console.log(this.player.level,protoGame.Game.game.rnd.integerInRange(0, 2)+((this.player.level-1)*3));

				this.frame=protoGame.Game.game.rnd.integerInRange(0, 2)+((this.player.level-1)*3);
				this.x=protoGame.Game.playingLevel.players[protoGame.Game.playingLevel.selectedPlayer].x;
				this.y=protoGame.Game.playingLevel.players[protoGame.Game.playingLevel.selectedPlayer].y;

				//_anim=this.animations.add('rotation', [0,1,2,3,4,5,6,7], 10, true);
				//_anim.play();
				
				
				protoGame.Game.game.time.events.add(index*1500, function(){ this.start(); },this);
				
				//console.log(this.x,this.y,this.target.x,this.target.y)
    			
				groupPlayersWeapons.add(this);

};


Player.Weapons.Sword.prototype = Object.create(Phaser.Sprite.prototype);
Player.Weapons.Sword.prototype.constructor = Player.Weapons.Sword;

Player.Weapons.Sword.prototype.start = function() { 

	this.player.play('attack').onComplete.removeAll();
	this.player.play('attack').onComplete.add(function(){ 

				
				this.player.play('attack2');
				
				protoGame.Game.game.add.tween(this).to( {alpha:1}, 200, Phaser.Easing.Quadratic.InOut, true, 0);

				protoGame.Game.game.physics.enable(this, Phaser.Physics.ARCADE);
				this.body.moves = true;
    			Xvector = (this.target.x - this.x);
    			Yvector = (this.target.y - this.y);

    			//console.log(Xvector,Yvector);
    			//this.target.body.moves=false;

    			this.body.allowGravity = false;  
    			this.body.velocity.setTo(Xvector, Yvector);
						

				 },this);

				

};


Player.Weapons.Sword.prototype.update = function() { 

protoGame.Game.game.physics.arcade.collide(this, this.target, this.collisionHandler, null, this);

this.angle+=5;

};


Player.Weapons.Sword.prototype.collisionHandler = function(obj1, obj2){

obj1.removeWeapon();

}

Player.Weapons.Sword.prototype.removeWeapon = function(_obj) { 


			var _style={fill: '#ffffff', fontSize: 40, stroke:'#ff0000', strokeThickness:10};
			_diceBonus = protoGame.Game.game.add.text(this.x, this.y,  "-"+this.damage, _style);
			_diceBonus.font = 'Press Start 2P';
			_diceBonus.anchor.set(.5);

			protoGame.Game.game.add.tween(_diceBonus).to( {y:this.y-40,alpha:0}, 500, Phaser.Easing.Quadratic.InOut, true, 0)
			.onComplete.add(function(_text){ _text.kill(); }, this);
			

		if(this.isLast){  
			//protoGame.Game.playingLevel.levelTimer.add(1000, protoGame.Game.action.stopPlayerAction, this);
			
			this.player.play('idle');

			protoGame.Game.game.time.events.add(1000, protoGame.Game.action.stopPlayerAction,this);


			 }
		
		this.target.damage(this.damage);
			 
		this.kill();
		this.destroy();

};




