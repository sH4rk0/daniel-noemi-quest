// JavaScript Document
var protoGame = protoGame || {};

protoGame.Game.action={
	
	
		targets:[],
		enemyPool:[],
			
			
		startEnemyAction:function(){
			this.enemyPool=[];
			groupEnemies.forEachAlive(function(_enemy){this.enemyPool.push( _enemy );},this);
			this.executeEnemyAttack();

		},

		executeEnemyAttack:function(){


			//cooperative or single attack
			//future feature


			//single Enemy attack
			if(this.enemyPool.length!=0){
				var _enemy=this.enemyPool.shift()
				_enemy.singleAttack();

			}else{

				this.stopEnemyAction()
			}


		},

		stopEnemyAction:function(){
			
				this.enemyPool=[];
				protoGame.Game.playingLevel.playersTurn();
			
			},




/* player action

----------------------------*/


		startPlayerAction:function(){

			protoGame.Game.action.targets=[];	
			this.executePlayerAttack();

		},

		executePlayerAttack:function(){


			_score=protoGame.Game.weapons.totalScore;

			var _attackScore=0;
			var _defenceScore=0;
			var _selectedLevel=protoGame.Game.playingLevel.players[protoGame.Game.playingLevel.selectedPlayer].level;


			_attackScore=parseInt(_score*(_selectedLevel*.25));

			_defenceScore=_score-_attackScore;

			if(_defenceScore>0){

				protoGame.Game.playingLevel.players[protoGame.Game.playingLevel.selectedPlayer].enableShield(_defenceScore);
			}

			if(_attackScore>0){
			//damage all enemies

					if(protoGame.Game.playingLevel.selectedEnemy.length==0){
					
						_avgScore=parseInt(_attackScore/groupEnemies.countLiving());
						
						groupEnemies.forEachAlive(function(_enemy){ 

							protoGame.Game.action.targets.push({target:protoGame.Game.playingLevel.enemies[_enemy.index],damage:_avgScore}); 


							 }); 
					
					}else{
				//damage single enemy or more


						_avgScore=parseInt(_attackScore/protoGame.Game.playingLevel.selectedEnemy.length);
						for(var i=0; i<protoGame.Game.playingLevel.selectedEnemy.length; i++)
						{
							protoGame.Game.action.targets.push({target:protoGame.Game.playingLevel.enemies[protoGame.Game.playingLevel.selectedEnemy[i]],damage:_avgScore});
					
						}
					

					}

				protoGame.Game.playingLevel.players[protoGame.Game.playingLevel.selectedPlayer].attack(this.targets);

			//console.log("_selectedLevel",_selectedLevel, "_score", _score, "_attackScore", _attackScore, "_defenceScore", _defenceScore, "_avgScore", _avgScore, "groupEnemies.countLiving()" ,groupEnemies.countLiving());


				}else{

				this.stopPlayerAction();

				}





		},

		stopPlayerAction:function(){


			protoGame.Game.weapons.totalScore=0;
			protoGame.Game.action.targets=[];
		
			//console.log(groupEnemies.countLiving());
			if(groupEnemies.countLiving()==0){
					
					protoGame.Game.playingLevel.displayGoNextMapItem();
				
				}else{
					
					protoGame.Game.playingLevel.players[protoGame.Game.playingLevel.selectedPlayer].action=true;
					protoGame.Game.playingLevel.checkNextAction();
			
			}
		}



			
			

		
	
	}
	
	