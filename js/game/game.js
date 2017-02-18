// JavaScript Document
var protoGame = protoGame || {};

protoGame.Game=function(game){ };



protoGame.Game.setCamera=function(x,y)
{

protoGame.Game.game.camera.x=x;
protoGame.Game.game.camera.y=y;

};
protoGame.Game.gameObj={
		routes:[{completed:0},{completed:0}],
		inventory:{
			coins:{copper:0, silver:0, gold:0, platinum:0},
			potions:{cureLight:0,cureMedium:0,cureHeavy:0},
			scrolls:{}
		}
		
		};

protoGame.Game.savedObj=null;
protoGame.Game.inventoryObj=null;

protoGame.Game.newGame=function(){ 
	protoGame.Game.savedObj=JSON.parse(JSON.stringify(protoGame.Game.gameObj))
	protoGame.Game.saveGameData(); 
};

protoGame.Game.saveGameData=function(){  

	localStorage.setItem('gameStored', JSON.stringify(protoGame.Game.savedObj)); };

protoGame.Game.loadGameData=function(){  return localStorage.getItem('gameStored'); };

protoGame.Game.continueGameData=function(){  protoGame.Game.savedObj=JSON.parse(protoGame.Game.loadGameData()); };

protoGame.Game.clearGameData=function(){ localStorage.removeItem('gameStored'); protoGame.Game.savedObj=null; };

protoGame.Game.backupInventory=function(){ 

	if(protoGame.Game.savedObj==null){ protoGame.Game.newGame();}
	protoGame.Game.inventoryObj=JSON.parse(JSON.stringify(protoGame.Game.savedObj.inventory));
};

protoGame.Game.storeInventory=function(){ 

	protoGame.Game.savedObj.inventory=JSON.parse(JSON.stringify(protoGame.Game.inventoryObj));

};

protoGame.Game.chanceRoll=function (chance) {
        if (chance === undefined) { chance = 50; }
        return chance > 0 && (Math.random() * 100 <= chance);
    };


