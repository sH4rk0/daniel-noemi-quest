Coin = function (x,y) {

			Phaser.Sprite.call(this, protoGame.Game.game, x, y, "coins");

			this.health=1;
			this.inputEnabled=true;
			this.events.onInputDown.add(this.getBonus, this);
			protoGame.Game.game.physics.enable(this);
			this.body.bounce.set(0.2);		
			this.body.velocity.y = protoGame.Game.game.rnd.integerInRange(-100, -160);
			this.body.velocity.x = protoGame.Game.game.rnd.integerInRange(-10, 10);
			this.bringToTop();

			//this.lifespan=protoGame.Game.game.rnd.integerInRange(8000, 10000);
			//this.events.onKilled.add(this.killed,this);
			protoGame.Game.game.time.events.add(protoGame.Game.game.rnd.integerInRange(4000, 8000), this.disappear, this);

			this.scale.set(2);
			var _type=0;

			var _rnd=protoGame.Game.game.rnd.integerInRange(0, 100	);
			if(_rnd<70){ _type=0; }
			else if(_rnd>=70 && _rnd<90){ _type=1; }
			else if(_rnd>90 && _rnd<99){ _type=2; }
			else if(_rnd==100){ _type=3; }

			this.type=_type;
			_type=_type*6;

			this.animations.add('rotation', [(0+_type),(1+_type),(2+_type),(3+_type),(4+_type),(5+_type)], 5, true);

			this.play('rotation');
			this.body.height=this.height-3;

			groupBonuses.add(this);


};

Coin.prototype = Object.create(Phaser.Sprite.prototype);
Coin.prototype.constructor = Coin;
Coin.prototype.disappear = function() {
	this.inputeEnabled=false;
	protoGame.Game.game.add.tween(this).to({alpha:0}, 300, Phaser.Easing.Linear.None, true, 0).onComplete.add(function(sprite){
			sprite.destroy();});

 };
Coin.prototype.update = function() {   };
Coin.prototype.killed = function() { }
Coin.prototype.getBonus = function() { protoGame.Game.bonuses.getRandomCoins(this.type);   this.destroy();  }


