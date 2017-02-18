// JavaScript Document
var protoGame = protoGame || {};

protoGame.Game.prototype.update=function(){
	
	
	
		switch (protoGame.Game.gameState){
							
						case protoGame.Game.gameStateMainMenu:
							protoGame.Game.mainMenu.introCloud1.tilePosition.x-= 0.08;
							protoGame.Game.mainMenu.introCloud2.tilePosition.x-= 0.1;
							protoGame.Game.mainMenu.intro4lands.tilePosition.x-= 0.02;
						

						break;
						
						case protoGame.Game.gameStateIntro:


							if(protoGame.Game.mainMenu.scrolling){
								protoGame.Game.mainMenu.introRoad.tilePosition.x-= 0.25;
								protoGame.Game.mainMenu.introRocks.tilePosition.x-= 0.005;
							}
							
							protoGame.Game.mainMenu.introCloud1.tilePosition.x-= 0.07;
							protoGame.Game.mainMenu.introCloud2.tilePosition.x-= 0.03;

						//protoGame.Game.mainMenu.testsprite._spriterGroup.updateAnimation();
						

							protoGame.Game.mainMenu.updateOrbiterMovement();
						
						break;

						case protoGame.Game.gameStateIntroStep2:
							protoGame.Game.mainMenu.introCloud1.tilePosition.x-= 0.08;
							protoGame.Game.mainMenu.introCloud2.tilePosition.x-= 0.1;
							protoGame.Game.mainMenu.intro4lands.tilePosition.x-= 0.02;


								groupIntroStep2.forEachAlive(function(_sprite){

									if(_sprite.body.velocity.y > 0){
										protoGame.Game.game.physics.arcade.collide(_sprite, protoGame.Game.mainMenu.tileLevelMapLayer, protoGame.Game.mainMenu.collisionHandler);

									}
									

								});

						break;
						
						case protoGame.Game.gameStateMap:
						
						break;
						
						case protoGame.Game.gameStatePlayingLevel:


								groupEnemies.forEachAlive(function(_enemy){

									if(_enemy.body.velocity.y > 0){
										protoGame.Game.game.physics.arcade.collide(_enemy, protoGame.Game.playingLevel.tileLevelMapLayer);

									}
									

								});

								groupBonuses.forEachAlive(function(_bonus){

									if(_bonus.body.velocity.y > 0){
										protoGame.Game.game.physics.arcade.collide(_bonus, protoGame.Game.playingLevel.tileLevelMapLayer);

									}
									

								});
								
						
						break;
						
						case protoGame.Game.gameStateGameover:
						
						break;
						
						case protoGame.Game.gameStateBonusStage:
						
						break;
						
		}
	
	
	
	}
	
	