// JavaScript Document
var protoGame = protoGame || {};

protoGame.Game.weapons={
	
		totalScore:0,
		weaponTypeDice : 'weaponTypeDice',
		weaponTypeDiceMath : 'weaponTypeDiceMath',
		weaponTypeDraw : 'weaponTypeDraw',
		weaponTypeMath : 'weaponTypeMath',
		
		
	
	init:function(){
		
		//console.log(protoGame.Game.playingLevel.selectedPlayer);
		//console.log(protoGame.Game.settings.players);
		
		switch (protoGame.Game.settings.players[protoGame.Game.playingLevel.selectedPlayer].weapon){
			
			
			case protoGame.Game.weapons.weaponTypeDice:
				//console.log(protoGame.Game.weapons.weaponTypeDice);
				protoGame.Game.weapons.dice.init();
			break;

			case protoGame.Game.weapons.weaponTypeDiceMath:
				//console.log(protoGame.Game.weapons.weaponTypeDice);
				protoGame.Game.weapons.diceMath.init();
			break;
			
			case protoGame.Game.weapons.weaponTypeDraw:
				//console.log(protoGame.Game.weapons.weaponTypeDraw);
			break;
			
			case protoGame.Game.weapons.weaponTypeMath:
				//console.log(protoGame.Game.weapons.weaponTypeMath);
			break;
			
				
			
			
			
			}
		
		
		
	
		}
		
		
		
	
	}
	
	