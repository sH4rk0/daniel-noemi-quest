Scroll = function (x,y) {

			Phaser.Sprite.call(this, protoGame.Game.game, x, y, "scrolls");

			this.health=1;
			this.inputEnabled=true;
			this.potionType=protoGame.Game.game.rnd.integerInRange(0, 6);
			this.frame=[this.potionType];
			this.events.onInputDown.add(this.getBonus, this);
			protoGame.Game.game.physics.enable(this);
			this.body.bounce.set(0.3);		
			this.body.velocity.y = -150;
			this.bringToTop();
			this.lifespan=protoGame.Game.game.rnd.integerInRange(3000, 4000);
			this.events.onKilled.add(this.killed,this);
			this.body.height=this.height-3;
			this.scale.set(2);
			this.anchor.set(.5,1);
			this.frame = protoGame.Game.game.rnd.integerInRange(0, 6);

			groupBonuses.add(this);


};

Scroll.prototype = Object.create(Phaser.Sprite.prototype);
Scroll.prototype.constructor = Scroll;
Scroll.prototype.update = function() {   };
Scroll.prototype.killed = function() { protoGame.Game.bonuses.removeBonus(this.x,this.y); this.destroy(); }
Scroll.prototype.getBonus = function() { protoGame.Game.bonuses.getRandomPotion(this.potionType); this.destroy();  }

