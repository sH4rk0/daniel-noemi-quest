Food = function (x,y) {

			Phaser.Sprite.call(this, protoGame.Game.game, x, y, "foods");

			this.health=1;
			this.inputEnabled=true;
			this.events.onInputDown.add(this.getBonus, this);
			protoGame.Game.game.physics.enable(this);
			this.body.bounce.set(0.3);		
			this.body.velocity.y = -150;
			this.bringToTop();
			this.lifespan=protoGame.Game.game.rnd.integerInRange(5000, 6000);;
			this.events.onKilled.add(this.killed,this);
			this.body.height=this.height-3;
			this.scale.set(2);
			this.anchor.set(.5,1);
			this.frame = protoGame.Game.game.rnd.integerInRange(0, 6);

			groupBonuses.add(this);


};

Food.prototype = Object.create(Phaser.Sprite.prototype);
Food.prototype.constructor = Food;
Food.prototype.update = function() {   };
Food.prototype.killed = function() { protoGame.Game.bonuses.removeBonus(this.x,this.y); this.destroy(); }
Food.prototype.getBonus = function() {  protoGame.Game.bonuses.getRandomFood(); this.destroy();  }

