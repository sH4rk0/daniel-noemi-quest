var protoGame = protoGame || {};

protoGame.Game.playingLevel={
	
	level:0,
	mapStep:0,
	selectedPlayer:undefined,
	selectedEnemy:[],
	
	menuDefence:[],
	menuAttack:[],

	levelObj:null,
	players:[],
	playersNuv:[],
	enemies:[],
	enemiesPlaces:[],
	playerToggle:true,
	isEnemiesTurn:false,
	
	groupMenuPlayer:[],
	groupMenuSelectionPlayer:[],

	levelBg:undefined,
	graphLayers:[],

	init:function(){
		

		//Add Top menu
		//----------------------------------------------------------------------------------------
		//----------------------------------------------------------------------------------------
		//add menu player 0
		//----------------------------------------------------------------------------------------
		groupTopLevel=protoGame.Game.game.add.group();
		groupTopLevel.fixedToCamera=true;

		this.topMenu=protoGame.Game.game.add.sprite(0,0, protoGame.Game.game.cache.getBitmapData('levelMenu'));
		groupTopLevel.add(this.topMenu);

		this.mapBtn=protoGame.Game.game.add.sprite(10,10, protoGame.Game.game.cache.getBitmapData('topicons'));
		this.mapBtn.inputEnabled=true;
		this.mapBtn.events.onInputDown.add(this.toMap, this);
		this.mapBtn.anchor.set(.5);
		groupTopLevel.add(this.mapBtn);
		groupTopLevel.visible=false;


		groupLevel.add(groupTopLevel);

		var _btn;
		groupLevel.visible=false;
		
		//Add players
		//----------------------------------------------------------------------------------------
		//----------------------------------------------------------------------------------------
		//player 0
		//----------------------------------------------------------------------------------------

		this.players.push(new Player(190,514,0,500));

		//player 1
		//----------------------------------------------------------------------------------------
		this.players.push(new Player(100,514,1,5));

		//ADD TILES EMPTY BG
		//----------------------------------------------------------------------------------------
		this.tileLevelMap = protoGame.Game.game.add.tilemap();
		this.tileLevelMap.setTileSize(40, 40);
		this.tileLevelMap.addTilesetImage('levelTiles');

		//Add go next
		//----------------------------------------------------------------------------------------
		//----------------------------------------------------------------------------------------
		//add menu player 0
		//----------------------------------------------------------------------------------------
		this.goNext=protoGame.Game.game.add.sprite((this.mapStep*800)+740,200, 'nextMap');
		this.goNext.anchor.set(.5);
		this.goNext.visible=false;
		this.goNext.alpha=0;
		this.goNext.inputEnabled=true;
		this.goNext.events.onInputDown.add(this.goNextMap, this);
																//properties, duration, ease, autoStart, delay, repeat, yoyo
		

		groupLevel.add(this.goNext);

		this.goNext.bringToTop();
		},
	
	hide:function(){

		groupTopLevel.fixedToCamera=false;
		//groupLevel.alpha=0;
		groupLevel.visible=false;
		this.levelBg.destroy();
		this.tileLevelMapLayer.destroy();
		for (_l=0;_l<this.graphLayers.length;_l++){ this.graphLayers[_l].destroy(); }

		this.graphLayers=[];
	},

	toMap:function(){

		protoGame.Game.playingLevel.mapBtn.inputEnabled=false;
		protoGame.Game.fade.show(function(){

			protoGame.Game.playingLevel.hide(); 
			protoGame.Game.map.display(); 

		});


	},



	display:function(){

		//backup inventory so if you die back to previous status
		protoGame.Game.backupInventory();
		//console.log(protoGame.Game.savedObj);

		protoGame.Game.playingLevel.goNext.x=740;
		protoGame.Game.playingLevel.mapBtn.inputEnabled=true;
		protoGame.Game.gameState=protoGame.Game.gameStatePlayingLevel;

		this.levelObj=protoGame.Game.map.routesObj[protoGame.Game.map.route].levels[protoGame.Game.map.level];

		//17*20 is the number of tiles on screen, visible(15*20)  
		this.levelObj.steps=parseInt(this.levelObj.tiles.collisionMap.length/(17*20));

		//console.log(_levelObj.steps);
		//groupLevel.alpha=1;
		groupLevel.visible=true;

		groupTopLevel.fixedToCamera=true;
		this.mapStep=0;

		var _xTiles=(20*this.levelObj.steps)+2;

		//add graph layers
		this.graphLayers=[];

		for (var _l=0; _l<this.levelObj.tiles.layers.length; _l++){
			this.graphLayers.push(this.tileLevelMap.create("level"+_l, _xTiles, 17, 40, 40));
			this.graphLayers[_l].sendToBack();
			this.graphLayers[_l].resizeWorld();
			for(var _t=0; _t<this.levelObj.tiles.layers[_l].length; _t++){
					_x=parseInt(_t % _xTiles);
					_y=parseInt(_t / _xTiles);
					this.tileLevelMap.putTile(this.levelObj.tiles.layers[_l][_t]-1, _x, _y, this.graphLayers[_l]);
			}

		}


		//add collision map layer		
		this.tileLevelMapLayer = this.tileLevelMap.create("level", _xTiles, 17, 40, 40);
		this.tileLevelMapLayer.sendToBack();
		this.tileLevelMapLayer.resizeWorld();

		this.tileLevelMap.setCollision([21,42],true);
		
		//console.log(_xTiles)

		for(var _t=0; _t<this.levelObj.tiles.collisionMap.length; _t++){
			_x=parseInt(_t % _xTiles);
			_y=parseInt(_t / _xTiles);


			//if(this.levelObj.tiles.collisionMap[_t]==22){}
			this.tileLevelMap.putTile(this.levelObj.tiles.collisionMap[_t]-1, _x, _y, this.tileLevelMapLayer);
		}


		this.setValidPlaces();
	
		protoGame.Game.setCamera(40,40);
		
		this.addEnemies();
		
		//groupLevel.visible=true;
		
		if(this.levelBg!=undefined){ this.levelBg.destroy();}
		this.levelBg=protoGame.Game.game.add.tileSprite(0,0,1200,600, protoGame.Game.map.routesObj[protoGame.Game.map.route].bg);
		this.levelBg.fixedToCamera=true;
		this.levelBg.tilePosition.x=0;
		this.levelBg.sendToBack();

		this.players[0].reset();
		this.players[1].reset();
		this.players[0].play("idle");
		this.players[1].play("idle");
		
		this.playersTurn();
		//this.enemiesTurn();

		//this.shake();

		//protoGame.Game.effects.lightning.createLightning(0,000,800,600);
		},
	
	addEnemies:function(){ 
		
		groupEnemies.destroy(true,true);
		//this.enemiesPlaces=gameData.places.slice(0);

		//console.log(this.enemiesPlaces, this.mapStep)
		var _enemiesPlaces=this.enemiesPlaces[this.mapStep].slice(0);


		//console.log(_enemiesPlaces)

		this.enemies=[];
		this.selectedEnemy=[];
		var numEnemy= protoGame.Game.game.rnd.integerInRange(1, 3) + this.mapStep;
		
		numEnemy=9;
		
		var _enemyObj,_place;
		
		for (var e=0; e<numEnemy; e++){

			_enemyObj=gameData.map.routes[protoGame.Game.map.route].enemies[protoGame.Game.game.rnd.integerInRange(0, gameData.map.routes[protoGame.Game.map.route].enemies.length-1)];
			
			_place=_enemiesPlaces.splice(protoGame.Game.game.rnd.integerInRange(0, _enemiesPlaces.length-1),1);
			//console.log(_place[0])

			this.enemies.push(new Enemy(_enemyObj,_place[0][0]+(this.mapStep*800),_place[0][1],e));
		
			}
			
			
	},

	setValidPlaces:function(){

		//console.log()

		var _xtilesTot=(this.levelObj.steps*20)+2;
		var _xStart;
		var _arr=[];
		this.enemiesPlaces=[];

		for (var _s=0; _s<this.levelObj.steps; _s++){

			_arr[_s]=[];

			for (var _y=0; _y<15; _y++){

				_xStart=(_xtilesTot+1)+(_y*_xtilesTot)+(_s*20);
				//console.log(_xStart)

				for (var _x=_xStart; _x<_xStart+20; _x++){

					 _arr[_s].push(this.levelObj.tiles.collisionMap[_x]) 

				} 
			}

		}

		//console.log(_arr[1].join(","))


		//console.log(_arr[1].join(","))
		//console.log(_arr[2].join(","))


		var _xTiles=20;
		for (var _p=0; _p<_arr.length; _p++ ){

			this.enemiesPlaces[_p]=[];
				for (var _z=0; _z<_arr[_p].length; _z++){

					_x=parseInt(_z % _xTiles);
					_y=parseInt(_z / _xTiles);

					//if(_arr[_p][_z]==43 && (_x*40)>300){this.enemiesPlaces[_p].push([(_x*40)+60,_y*40])}

					if(_arr[_p][_z]==43){this.enemiesPlaces[_p].push([(_x*40)+60,_y*40])}
					 
				}

		}

		//console.log(this.enemiesPlaces)

	},

	deselectEnemy:function(){ this.selectedEnemy=[]; groupEnemies.forEach(function(_enemy){ _enemy.alpha=1; }); },	


	checkNextAction:function(){
		
		// if both players completed action
		if(this.players[0].action && this.players[1].action){  
		
			this.enemiesTurn();
			
				}else{
					
					
			this.playerToggle.true;
			this.deselectEnemy();
		

			if(!this.players[0].action && this.players[0].health>0){

				
				
					this.selectedPlayer=0;
					this.players[1].alpha=0.5;
					this.players[0].alpha=1;
					this.players[0].inGroupMenuPlayer(0);	
				
				}

			if(!this.players[1].action && this.players[1].health>0){
					
					//console.log("pl2")

					this.selectedPlayer=1;
					this.players[0].alpha=0.5;
					this.players[1].alpha=1;
					this.players[1].inGroupMenuPlayer(1);
					
					
					}
			
			
			}
		
		
		
		},
		
	levelCompleted:function(){ 

			//store in the inventory the collected items and save the game
			protoGame.Game.storeInventory();
			//console.log(protoGame.Game.savedObj,protoGame.Game.playingLevel.route)
			protoGame.Game.savedObj.routes[protoGame.Game.map.route].completed++;
			protoGame.Game.saveGameData();

			//display the map
			 protoGame.Game.fade.show(function(){ 

			 	protoGame.Game.playingLevel.hide(); 
			 	protoGame.Game.map.display(); 

			 });
		

			},
		

	displayGoNextMapItem:function(){

		protoGame.Game.playingLevel.goNext.visible=true;
		protoGame.Game.playingLevel.goNext.alpha=1;
		protoGame.Game.game.tweens.removeFrom(protoGame.Game.playingLevel.goNext);
		protoGame.Game.game.add.tween(protoGame.Game.playingLevel.goNext).to({ x: protoGame.Game.playingLevel.goNext.x+50 },  700, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);



	},
	

	goNextMap:function(_enemies){
		
		this.mapStep++;

		//hide and move next button
		protoGame.Game.playingLevel.goNext.visible=false;
		protoGame.Game.playingLevel.goNext.alpha=0;
		protoGame.Game.playingLevel.goNext.x=(this.mapStep*800)+740;
		protoGame.Game.game.tweens.removeFrom(protoGame.Game.playingLevel.goNext);
		

		

		
		if(protoGame.Game.playingLevel.mapStep==gameData.map.routes[protoGame.Game.map.route].levels[protoGame.Game.map.level].steps) {
			
			this.levelCompleted();
			
			
			} else{
					
		
			this.addEnemies(_enemies)

			var bgMove=protoGame.Game.game.add.tween(this.levelBg.tilePosition)
			.to({ x: -(protoGame.Game.playingLevel.mapStep*40) }, 1000, Phaser.Easing.Sinusoidal.InOut, true);

			protoGame.Game.game.add.tween(protoGame.Game.game.camera)
	            .to({ x: (protoGame.Game.playingLevel.mapStep*800)+40 }, 1000, Phaser.Easing.Sinusoidal.InOut, true).onComplete.add(function(){ 
			
				protoGame.Game.playingLevel.selectedPlayer=undefined;
				protoGame.Game.playingLevel.playerToggle=true;

				if(!protoGame.Game.playingLevel.players[0].isDown) protoGame.Game.playingLevel.players[0].moveNextMap();
				if(!protoGame.Game.playingLevel.players[1].isDown) protoGame.Game.playingLevel.players[1].moveNextMap();

				protoGame.Game.game.time.events.add(4000, protoGame.Game.playingLevel.playersTurn, protoGame.Game.playingLevel);

			
			 });
			
		}
            
		
		},
		
	enemiesTurn:function(){
		
			this.isEnemiesTurn=true;
			this.deselectEnemy();

			protoGame.Game.playingLevel.players[0].alpha=1;
			protoGame.Game.playingLevel.players[1].alpha=1;

			var _style={fill: '#ffffff', fontSize: 40, stroke:'#ff0000', strokeThickness:10};
			_text = protoGame.Game.game.add.text(0, 300,  "Enemies turn", _style);
			_text.font = 'Press Start 2P';
			_text.anchor.set(.5);
			_text.alpha=0;
			groupLevelMessages.add(_text);

			//enter Enemies turn 
			protoGame.Game.game.add.tween(_text).to( {x:400,alpha:1}, 500, Phaser.Easing.Quadratic.InOut, true, 0)
			.onComplete.add(function(_text){ 

					//exit Enemies turn 
					protoGame.Game.game.add.tween(_text).to( {x:800,alpha:0}, 500, Phaser.Easing.Quadratic.InOut, true, 1000)
					.onComplete.add(function(_text){ 

							//start enemy action
							protoGame.Game.action.startEnemyAction();

			     			_text.kill(); 
					}, this);

			}, this);
		
		},

	playersTurn:function(){


		//check if players are alive
		if(this.playersAreDown()){ 

			this.gameOver(); 


			}else{ 

			this.players[0].action=true;
			this.players[1].action=true;

			var _style={fill: '#ffffff', fontSize: 40, stroke:'#ff0000', strokeThickness:10};
				_text = protoGame.Game.game.add.text(0, 300,  "Players turn", _style);
				_text.font = 'Press Start 2P';
				_text.anchor.set(.5);
				_text.alpha=0;
				groupLevelMessages.add(_text);
 

				protoGame.Game.game.add.tween(_text).to( {x:400,alpha:1}, 500, Phaser.Easing.Quadratic.InOut, true, 0).onComplete.add(function(_text){ 

					protoGame.Game.game.add.tween(_text).to( {x:800,alpha:0}, 500, Phaser.Easing.Quadratic.InOut, true, 1000).onComplete.add(function(_text){ 

			     			protoGame.Game.playingLevel.players[0].action=false;
							protoGame.Game.playingLevel.players[1].action=false;

							if(!protoGame.Game.playingLevel.players[0].isDown) protoGame.Game.playingLevel.players[0].action=false;
							if(!protoGame.Game.playingLevel.players[1].isDown) protoGame.Game.playingLevel.players[1].action=false;
							protoGame.Game.playingLevel.selectedPlayer=undefined;
							protoGame.Game.playingLevel.isEnemiesTurn=false;
							protoGame.Game.playingLevel.playerToggle=true;
							protoGame.Game.playingLevel.selectedEnemy=[];

							_text.kill(); 

					}, this);

				}, this);


							
				

		}
	},
		
	playersAreDown:function(){


		if(this.players[0].isDown && this.players[1].isDown){ return true;}
		return false;
	},

	playerIsDown:function(){


		if(this.players[0].isDown || this.players[1].isDown){ return true;}
		return false;
	},

	
	gameOver:function(){


		console.log("game over")


	},

	getPlayerToDamage:function(){

		
				// here to insert some damage logic
				if(!protoGame.Game.playingLevel.playersAreDown()){

					if(protoGame.Game.playingLevel.players[0].isDown) return 1

					if(protoGame.Game.playingLevel.players[1].isDown) return 0

					if(!protoGame.Game.playingLevel.players[0].isDown &&  !protoGame.Game.playingLevel.players[0].isDown) return protoGame.Game.game.rnd.integerInRange(0,1);
				 	
					
				}

				
	},

	shake:function(_type){

		switch(_type){

			case "strong":
				protoGame.Game.game.camera.y = 40;
	       		protoGame.Game.game.add.tween(protoGame.Game.game.camera)
	            .to({ y: 60 }, 40, Phaser.Easing.Sinusoidal.InOut, false, 0, 5, true)
	            .start();

			default:
				protoGame.Game.game.camera.y = 40;
	       		protoGame.Game.game.add.tween(protoGame.Game.game.camera)
	            .to({ y: 50 }, 40, Phaser.Easing.Sinusoidal.InOut, false, 0, 5, true)
	            .start();
			break;

		}
		
		
	}



		
		
}