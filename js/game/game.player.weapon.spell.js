Player.Weapons.Spell = function (target,index,isLast) {

	
		Phaser.Sprite.call(		this,
								protoGame.Game.game, 
								target.target.x,
								target.target.y, 
								"spells"

							);

				this.anchor.set(.5);
				this.isLast=isLast;
				this.damage=target.damage;
				this.target=target.target;

				var _attack=this.animations.add('spell', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29], 20, false);
				_attack.play('spell');
				_attack.onComplete.add(function(){ this.removeWeapon();}, this);
			

				groupPlayersWeapons.add(this);



};

Player.Weapons.Spell.prototype = Object.create(Phaser.Sprite.prototype);
Player.Weapons.Spell.prototype.constructor = Player.Weapons.Spell;
Player.Weapons.Spell.prototype.update = function() { };
Player.Weapons.Spell.prototype.removeWeapon = function(_obj) { 

			this.target.damage(this.damage);
		
			var _style={fill: '#ffffff', fontSize: 40, stroke:'#ff0000', strokeThickness:10};
			_diceBonus = protoGame.Game.game.add.text(this.x, this.y,  "-"+this.damage, _style);
			_diceBonus.font = 'Press Start 2P';
			_diceBonus.anchor.set(.5);

			protoGame.Game.game.add.tween(_diceBonus).to( {y:this.y-40,alpha:0}, 500, Phaser.Easing.Quadratic.InOut, true, 0)
			.onComplete.add(function(_text){ _text.kill(); _text.destroy(); }, this);

			this.kill();
			this.destroy();

		if(this.isLast){  

			protoGame.Game.playingLevel.players[protoGame.Game.playingLevel.selectedPlayer].play('idle');

			protoGame.Game.game.time.events.add(1000, protoGame.Game.action.stopPlayerAction,this);

			//protoGame.Game.playingLevel.levelTimer.add(1000, protoGame.Game.action.stopPlayerAction, this); 
		}

		this.kill();
		this.destroy();

};




