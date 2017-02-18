EnemyWeapon = function (enemyObj,x,y) {

			
		Phaser.Sprite.call(this, protoGame.Game.game, x, y, enemyObj.sprite);


		var _player=protoGame.Game.playingLevel.getPlayerToDamage();
		
		if(_player!=undefined){


			var _x = protoGame.Game.playingLevel.players[_player].x;
			var _y = protoGame.Game.playingLevel.players[_player].y;

			var _props = this.weaponProps(enemyObj.weapons);

				this.damage=_props.damage;

				if(_props.frames.length>1){
				//setup animation if frames are >1

				}else{

					this.frame=_props.frames[0];
				}
				

				this.alpha=0;
				this.anchor.set(0.5);
				this.target=_player;
				this.angleMove=protoGame.Game.game.rnd.integerInRange(1,5);
				this.angle=protoGame.Game.game.rnd.integerInRange(0,360);
			
			
			var _tween=protoGame.Game.game.add.tween(this).to( {x:_x, y: _y }, 1000, Phaser.Easing.Linear.None, true, 0);
			_tween.onComplete.add(this.removeWeapon, this );
			_tween.onStart.add(function(_sprite){  _sprite.alpha=1 },this);

			groupEnemiesWeapons.add(this); 

		}
		else{

			protoGame.Game.action.stopEnemyAction();

		}	




};

EnemyWeapon.prototype = Object.create(Phaser.Sprite.prototype);
EnemyWeapon.prototype.constructor = EnemyWeapon;
EnemyWeapon.prototype.update = function() {  this.angle+=this.angleMove; };
EnemyWeapon.prototype.removeWeapon = function(_obj) { 


		protoGame.Game.playingLevel.players[this.target].damage(this.damage);
		protoGame.Game.action.executeEnemyAttack();
		this.kill();
		this.destroy();


};

EnemyWeapon.prototype.weaponProps = function(_obj) { 


		var _weapon = _obj.ranged[protoGame.Game.game.rnd.integerInRange(0,_obj.ranged.length-1)];
		var _score=0;

		for(var i=0; i<_weapon.attack; i++){

			_score+=protoGame.Game.game.rnd.integerInRange(1,_weapon.damage)+_weapon.bonus;

		}


		return {damage:_score,frames:_weapon.frames}; 

	};


