EnemyDeath = function (who,x,y,frame) {


			//console.log(who,x,y,frame);
			Phaser.Sprite.call(this, protoGame.Game.game, x, y, who);

			protoGame.Game.game.physics.enable(this);
			this.body.bounce.set(0.2);	
			this.anchor.set(.5);	
			this.frame=frame;
			
			this.body.velocity.y = protoGame.Game.game.rnd.integerInRange(-400, -700);
		    this.body.velocity.x = protoGame.Game.game.rnd.integerInRange(-100, 100);
		    this.body.acceleration.y = 1000;
		    this.angle = protoGame.Game.game.rnd.integerInRange(0, 190);

			this.bringToTop();

			groupEnemiesDeath.add(this);


};

EnemyDeath.prototype = Object.create(Phaser.Sprite.prototype);
EnemyDeath.prototype.constructor = EnemyDeath;
EnemyDeath.prototype.update = function() {  

this.angle+=1;

if (this.y>600+this.height){

	this.kill();
	this.destroy();
	
}

 };



