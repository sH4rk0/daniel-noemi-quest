
var protoGame = protoGame || {};

protoGame.Game.bonuses={
	
	
		
		addBonus:function(x,y,enemy){ 

			this.setRandomCoins(x,y,enemy);
			
			var _rnd=protoGame.Game.game.rnd.integerInRange(0, 100);

			if(_rnd>=70 && _rnd<87){ this.setRandomFood(x,y); }
			else if(_rnd>=85 && _rnd<95){ this.setRandomPotion(x,y); }
			else if(_rnd>=95){ this.setRandomScroll(x,y); }

		},

		removeBonus:function(x,y){

			var _puf=protoGame.Game.game.add.sprite(x,y, 'puf');
			var anim = _puf.animations.add('puf', [0,1,2,3,4], 10, false);
			_puf.play('puf');
			_puf.anchor.set(.5,1);
			_puf.scale.set(2);
			anim.onComplete.add(function(puf){ puf.kill(); puf.destroy();},_puf)

		},

		setRandomCoins:function(x,y,enemy){ 

			var _rnd=protoGame.Game.game.rnd.integerInRange(1, 3+enemy.level);
			for (b=1; b<=_rnd; b++){ new Coin (x,y); }
			

		},
		setRandomFood:function(x,y){},
		setRandomPotion:function(x,y){},
		setRandomScroll:function(x,y){},


		getRandomCoins:function(_type){ 

				switch(_type){
						case 0:protoGame.Game.inventoryObj.coins.copper+=1;break;
						case 1:protoGame.Game.inventoryObj.coins.silver+=1;break;
						case 2:protoGame.Game.inventoryObj.coins.gold+=1;break;
						case 3:protoGame.Game.inventoryObj.coins.platinum+=1;break;

				}
				
		 },
		getRandomFood:function(_type){},
		getRandomPotion:function(_type){},
		getRandomScroll:function(_type){},
		
	
	}





