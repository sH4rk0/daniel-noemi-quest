
Enemy = function (enemyObj,x,y,index) {

			Phaser.Sprite.call(this, protoGame.Game.game, x, y, enemyObj.sprite);

			//this.scale.set(.25);


			this.enemyObj=enemyObj;
			this.name=enemyObj.name;
			this.index=index;
			this.health=enemyObj.health + this.enemyRandomHealth(); 
			this.startHealth=this.health;
			this.inputEnabled=true;
			this.events.onInputDown.add(this.selectEnemy, this);

			this.anchor.set(0.5);
			protoGame.Game.game.physics.enable(this);
			
			//this.events.onKilled.add(this.killed,this);
			this.body.bounce.set(0.6);		
			this.body.velocity.y = -150;

			this.animations.add('idle', enemyObj.anim.idle.frames, protoGame.Game.game.rnd.realInRange(enemyObj.anim.idle.speed, enemyObj.anim.idle.speed+1),enemyObj.anim.idle.speed, enemyObj.anim.idle.loop);
			this.animations.add('hit', enemyObj.anim.hit.frames, enemyObj.anim.hit.speed, enemyObj.anim.hit.loop);
			
			var _attack=this.animations.add('attack', enemyObj.anim.attack.frames, enemyObj.anim.attack.speed, enemyObj.anim.attack.loop);
			_attack.onComplete.add(function(){ this.play('idle');}, this);

			this.play('idle');

			//this.body.height=this.height-10;
			this.body.setSize(40, this.height-10, 20, 0);

			var _style={fill: '#000000', fontSize: 8, stroke:'#ffffff', strokeThickness:3};
			this.healthText = protoGame.Game.game.add.text(0, 0, this.startHealth+"/"+this.startHealth, _style);
			this.healthText.font = 'Press Start 2P';
			this.healthText.anchor.set(0.5,2.1);
			this.addChild(this.healthText);


			groupEnemies.add(this);


};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {};

Enemy.prototype.singleAttack = function() {

	this.play('attack');
	new EnemyWeapon(this.enemyObj,this.x,this.y);

};

//Enemy.prototype.killed = function() { console.log("killed")}

Enemy.prototype.damage = function(_damage) {

		this.health-=_damage;
		this.healthText.text=this.startHealth+"/"+this.health;

		if(this.health<=0) { 

			protoGame.Game.bonuses.addBonus(this.x,this.y,this.enemyObj); 
			this.death();

			 this.inputEnabled = false;
		     this.alive=false;
			 this.bringToTop();
			 
			 this.kill();
			 this.destroy();

		}
		else
		{


		//var _tween=protoGame.Game.game.add.tween(this).to( {x:this.x+10}, 200, Phaser.Easing.Quadratic.Out, true, 0);

			this.body.moves=true;
			this.body.velocity.x=0;
			this.body.velocity.y = protoGame.Game.game.rnd.integerInRange(-60, -80);
			this.play("idle");
		}

}

Enemy.prototype.death = function() {


for (var i=0; i<this.enemyObj.anim.death.frames.length; i++){

	new EnemyDeath(this.enemyObj.sprite,this.x,this.y,this.enemyObj.anim.death.frames[i]);

}


}


Enemy.prototype.enemyRandomHealth=function(){ return 1; };

Enemy.prototype.selectEnemy = function() { 

		
		if(!protoGame.Game.playingLevel.isEnemiesTurn){

				var _index=protoGame.Game.playingLevel.selectedEnemy.indexOf(this.index);

				if(_index!=-1){
					
					protoGame.Game.playingLevel.selectedEnemy.splice(_index,1);
					this.alpha=0.5;
					if(protoGame.Game.playingLevel.selectedEnemy.length==0) this.deselectEnemy();
				
				}else{
				
					
					protoGame.Game.playingLevel.selectedEnemy.push(this.index);

					groupEnemies.forEach(function(_enemy){ 

					if(protoGame.Game.playingLevel.selectedEnemy.indexOf(_enemy.index)==-1) _enemy.alpha=0.5; });
						
					this.alpha=1;
					
				}
		}

 };

Enemy.prototype.deselectEnemy = function(){ protoGame.Game.playingLevel.selectedEnemy=[]; groupEnemies.forEach(function(_enemy){ _enemy.alpha=1; }); };
	
	