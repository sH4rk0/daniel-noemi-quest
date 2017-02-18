var protoGame = protoGame || {};

protoGame.Game.mainMenu={
	
	
	scrolling:true,
	isOrbitStarted:false,
	start:{x:0,y:0},
	tweens:[],
	times:[],
	introStatus:"beforeStart",
	chests:[],
	items:[],
	itemsCount:0,
	

	init:function(){


	    this.introSky=protoGame.Game.game.add.tileSprite(0,-50,800,650, 'introSky');
		this.introSky.events.onInputDown.add(this.startIntro,this);
		this.introSky.inputEnabled=false;
		this.introSky.visible=false;
		
		this.introSky.sendToBack();
		//groupMainMenu.add(this.introSky);
		
		this.introCloud1=protoGame.Game.game.add.tileSprite(0,0,800,300, 'cloud1');
		this.introCloud1.fixedToCamera=true;
		this.introCloud1.tilePosition.x=0;
		this.introCloud1.sendToBack();
		groupMainMenu.add(this.introCloud1);
		
		this.introCloud2=protoGame.Game.game.add.tileSprite(0,0,800,300, 'cloud2');
		this.introCloud2.fixedToCamera=true;
		this.introCloud2.tilePosition.x=0;
		this.introCloud2.sendToBack();
		groupMainMenu.add(this.introCloud2);

		var _style={font: 'normal 16px', fill: '#ffffff', stroke:'#1d5779', strokeThickness:3};
		this.introText= protoGame.Game.game.add.text(10, 10, 'A sunny day on Salerno Coast... \nDaniel and Noemi are walking,\nwatching the beautiful sea...', _style);
		this.introText.font='Press Start 2P';
		this.introText.anchor.set(0);
		this.introText.bringToTop();
		groupMainMenu.add(this.introText);
		
		this.introRocks=protoGame.Game.game.add.tileSprite(0,298,800,96, 'introRocks');
		groupMainMenu.add(this.introRocks);
		
		this.introRoad=protoGame.Game.game.add.tileSprite(0,331,800,269, 'introRoad');
		groupMainMenu.add(this.introRoad);

		this.intro4lands=protoGame.Game.game.add.tileSprite(0,205,843,316, '4lands');
		this.intro4lands.fixedToCamera=true;
		this.intro4lands.tilePosition.x=0;
		this.intro4lands.sendToBack();
		this.intro4lands.visible=false;
		//groupMainMenu.add(this.intro4lands);


		this.hole=protoGame.Game.game.add.sprite(0,0, 'hole');
		this.hole.anchor.set(0.5);
		this.hole.alpha=0;
		this.hole.animations.add('idle', [3,4,5,6,7,8,7,6,5], 7, true);
		groupMainMenu.add(this.hole);

		playersGroup = protoGame.Game.game.add.group();
		groupMainMenu.add(playersGroup);

		orbiterGroup = protoGame.Game.game.add.group();
        orbiterGroup.visible=false;
        groupMainMenu.add(orbiterGroup);

        //skip intro button
        this.skipBtn=protoGame.Game.game.add.sprite(710,560, "btn1");
		this.skipBtn.inputEnabled=false;
		this.skipBtn.events.onInputDown.add(this.skip, this);
		this.skipBtn.alpha=0;
		this.skipBtn.anchor.set(.5);
		var _style={font: 'normal 18px', fill: '#ffffff', stroke:'#583a20', strokeThickness:5};
		var _skiptext = protoGame.Game.game.add.text(0, 0, 'Skip', _style);
		_skiptext.font='Press Start 2P';
		_skiptext.anchor.set(.5,.3);
		this.skipBtn.addChild(_skiptext);
		groupMainMenu.add(this.skipBtn);

		//restart intro button
		this.restartBtn=protoGame.Game.game.add.sprite(710,560, "btn1");
		this.restartBtn.inputEnabled=false;
		this.restartBtn.events.onInputDown.add(this.restart, this);
		this.restartBtn.alpha=0;
		this.restartBtn.anchor.set(.5);
		var _style={font: 'normal 18px', fill: '#ffffff', stroke:'#583a20', strokeThickness:5};
		var _restarttext = protoGame.Game.game.add.text(0, 0, 'Intro', _style);
		_restarttext.font='Press Start 2P';
		_restarttext.anchor.set(.5,.3);
		this.restartBtn.addChild(_restarttext);
		groupMainMenu.add(this.restartBtn);

		//new game
		this.newgameBtn=protoGame.Game.game.add.sprite(400,350, "btn2");
		this.newgameBtn.inputEnabled=true;
		this.newgameBtn.events.onInputDown.add(this.newgame, this);
		this.newgameBtn.alpha=0;
		this.newgameBtn.visible=false;
		this.newgameBtn.anchor.set(.5);
		var _style={font: 'normal 18px', fill: '#ffffff', stroke:'#583a20', strokeThickness:5};
		var _newgametext = protoGame.Game.game.add.text(0, 0, 'New Game', _style);
		_newgametext.font='Press Start 2P';
		_newgametext.anchor.set(.5,.3);
		this.newgameBtn.addChild(_newgametext);
		groupMenuBtn.add(this.newgameBtn);

		//continue game
		this.continuegameBtn=protoGame.Game.game.add.sprite(400,410, "btn2");
		this.continuegameBtn.inputEnabled=true;
		this.continuegameBtn.events.onInputDown.add(this.continuegame, this);
		this.continuegameBtn.alpha=0;
		this.continuegameBtn.visible=false;
		this.continuegameBtn.anchor.set(.5);
		var _style={font: 'normal 18px', fill: '#ffffff', stroke:'#583a20', strokeThickness:5};
		var _continuegametext = protoGame.Game.game.add.text(0, 0, 'Continue Game', _style);
		_continuegametext.font='Press Start 2P';
		_continuegametext.anchor.set(.5,.3);
		this.continuegameBtn.addChild(_continuegametext);
		groupMenuBtn.add(this.continuegameBtn);



		groupMainMenu.visible=false;

/* Set up players for intro
-------------------------------------------------------------------------------------------------------------*/
		/* Daniel
		---------------------------*/
		this.daniel = protoGame.Game.playingLevel.players[0];
		
		this.daniel.scale.set(1.5);
		this.daniel.healthText.visible=false;
		this.daniel.x=110;
		this.daniel.y=440;
		this.daniel.play('walk');

		playersGroup.add(this.daniel);
		
		/* Noemi
		---------------------------*/
		this.noemi = protoGame.Game.playingLevel.players[1];
		this.noemi.scale.set(1.5);
		this.noemi.healthText.visible=false;
		this.noemi.x=70;
		this.noemi.y=500;
		this.noemi.play('walk');

		playersGroup.add(this.noemi);

/*
-------------------------------------------------------------------------------------------------------------*/

		this.introEffect=protoGame.Game.game.add.sprite(400,400,"introEffect");
		this.introEffect.anchor.set(.5);
		this.introEffect.scale.set(.3);
		groupLogo.add(this.introEffect);

		this.introEffect2=protoGame.Game.game.add.sprite(400,400,"introEffect");
		this.introEffect2.anchor.set(.5);
		this.introEffect2.scale.set(.4);
		groupLogo.add(this.introEffect2);
		

		this.logoScrollDown=protoGame.Game.game.add.sprite(495,180,"logoscrollDown");
		groupLogo.add(this.logoScrollDown);
		this.logoScrollUp=protoGame.Game.game.add.sprite(400,80,"logoscrollUp");
		groupLogo.add(this.logoScrollUp);
		this.logoScroll=protoGame.Game.game.add.sprite(108,100,"logoscroll");
		groupLogo.add(this.logoScroll);
		this.logoQuest=protoGame.Game.game.add.sprite(130,110,"logoquest");
		groupLogo.add(this.logoQuest);
		this.logoSword=protoGame.Game.game.add.sprite(580,40,"logosword");
		groupLogo.add(this.logoSword);

		var _style={font: 'normal 30px', fill: '#ffffff', stroke:'#ff0000', strokeThickness:8};
		this.logoDaniel = protoGame.Game.game.add.text(140, 80, 'Daniel', _style);
		this.logoDaniel.font='Press Start 2P';
		groupLogo.add(this.logoDaniel);
		var _style={font: 'normal 38px', fill: '#ffffff', stroke:'#ff0000', strokeThickness:8};
		this.logoAnd = protoGame.Game.game.add.text(335, 74, '&', _style);
		this.logoAnd.font='Press Start 2P';
		groupLogo.add(this.logoAnd);
		var _style={font: 'normal 30px', fill: '#ffffff', stroke:'#ff0000', strokeThickness:8};
		this.logoNoemi = protoGame.Game.game.add.text(390, 80, "Noemi's", _style);
		this.logoNoemi.font='Press Start 2P';
		groupLogo.add(this.logoNoemi);

		this.introShield=protoGame.Game.game.add.sprite(400,400,"introShield");
		this.introShield.anchor.set(.5);
		this.introShield.inputEnabled=false;
		this.introShield.events.onInputDown.add(this.playGame, this);
		groupLogo.add(this.introShield);

		var _style={font: 'normal 22px', fill: '#ffffff', stroke:'#333333', strokeThickness:8};
		this.logoPlay = protoGame.Game.game.add.text(400, 400, "PLAY", _style);
		this.logoPlay.font='Press Start 2P';
		this.logoPlay.anchor.set(.5)
		groupLogo.add(this.logoPlay);
	
		groupLogo.visible=false;

	},


	startIntro:function(){

		this.introSky.visible=true;
		protoGame.Game.game.add.tween(this.introText).to({alpha:0}, 500, Phaser.Easing.Quadratic.In, true, 0);
		//disable start intro button	
		this.introSky.inputEnabled=false;
		//display skip button
		protoGame.Game.game.add.tween(this.skipBtn).to({alpha:1}, 500, Phaser.Easing.Linear.None, true, 0).onComplete.add(function(){ protoGame.Game.mainMenu.skipBtn.inputEnabled=true; });
		//set intro status
		this.introStatus="beforeOrbiting";
		this.noemi.play("idleIntro");
		this.daniel.play("idleIntro");

		//set players baloon time events text
		this.times.push(protoGame.Game.game.time.events.add(2000, function(){  this.saySome("Hey!!... What?!"); },this.daniel));
		this.times.push(protoGame.Game.game.time.events.add(4000, function(){  this.saySome("It's attracting us!!!"); },this.noemi));
		this.times.push(protoGame.Game.game.time.events.add(7000, function(){  this.saySome("Run! Run!! Run!!!"); },this.daniel));


		orbiterGroup.visible=true;
		this.hole.scale.set(1.5);
		this.start.x=this.hole.x=400;//protoGame.Game.game.input.x;
		this.start.y=this.hole.y=300;//protoGame.Game.game.input.y;


		//ADD NOEMI TO ORBITER AFTER TWEEN
		//push tween into array in order to remove programmatically on skip
		this.tweens.push(protoGame.Game.game.add.tween(this.noemi).to({x:this.noemi.x+50}, 10000, Phaser.Easing.Quadratic.In, true, 0));
		//on tween complete add Noemi to orbit group
		this.tweens[0].onComplete.add(function(){

		        var dist=Phaser.Math.distance(this.noemi.x,this.noemi.y,this.start.x,this.start.y);
				var angle=Phaser.Math.angleBetween(this.noemi.x,this.noemi.y,this.start.x,this.start.y);
				this.noemi.moveData.altitude = dist;
				this.noemi.moveData.orbit = 150-(angle*+1);
				this.noemi.play("orbit");
				this.introStatus="orbiting";
				orbiterGroup.add(this.noemi);
				this.times.push(protoGame.Game.game.time.events.add(protoGame.Game.game.rnd.integerInRange(0, 100), function(){  

					this.saySome("AHHHHHHHH!!!!!"); 
				},this.noemi));

		},this);


		this.times.push(protoGame.Game.game.time.events.add(protoGame.Game.game.rnd.integerInRange(4000, 6000), function(){  
				this.introStatus="running";
				this.play("walkback");
		},this.noemi));

		this.times.push(protoGame.Game.game.time.events.add(protoGame.Game.game.rnd.integerInRange(4000, 6000), function(){  
				this.introStatus="running";
				this.play("walkback"); 
		},this.daniel));

		//ADD DANIEL TO ORBITER AFTER TWEEN
		//push tween into array in order to remove programmatically on skip
		this.tweens.push(protoGame.Game.game.add.tween(this.daniel).to({x:this.daniel.x+50}, 10000, Phaser.Easing.Quadratic.In, true, 0));
		//on tween complete add Daniel to orbit group
		this.tweens[1].onComplete.add(function(){
		
				var dist=Phaser.Math.distance(this.daniel.x,this.daniel.y,this.start.x,this.start.y);
				var angle=Phaser.Math.angleBetween(this.daniel.x,this.daniel.y,this.start.x,this.start.y);
				this.daniel.moveData.altitude = dist;
				this.daniel.moveData.orbit = 150-(angle*+1);
				this.daniel.play("orbit");
				this.introStatus="orbiting";
				orbiterGroup.add(this.daniel);
				this.times.push(protoGame.Game.game.time.events.add(protoGame.Game.game.rnd.integerInRange(0, 100), function(){  

					this.saySome("AHHHHHHHH!!!!!"); 
				},this.daniel));

		},this);

		this.scrolling=false;
		this.isOrbitStarted=true;

		protoGame.Game.game.add.tween(this.hole).to({alpha:1}, 1000, Phaser.Easing.Linear.None, true, 0);
		
		this.hole.play('idle');

		},


	initIntroTilemap:function(){

		//console.log("initIntroTilemap");
		this.tileLevelMap = protoGame.Game.game.add.tilemap();
		this.tileLevelMap.setTileSize(40, 40);
		this.tileLevelMap.addTilesetImage('levelTiles');
		this.tileLevelMapLayer = this.tileLevelMap.create("introCollision", 20, 15, 40, 40);
		this.tileLevelMapLayer.resizeWorld();
		this.tileLevelMapLayer.visible=false;
		this.tileLevelMap.setCollision([21],true);

		var _introMap=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 44, 68, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 45, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 45, 65, 44, 68, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 44, 3, 2, 3, 4, 68, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 44, 0, 0, 45, 23, 23, 24, 25, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 45, 0, 0, 46, 23, 23, 24, 25, 65, 0, 0, 0, 0, 0, 0, 44, 68, 0, 0, 0, 47, 68, 0, 47, 24, 23, 24, 25, 67, 0, 0, 0, 0, 0, 0, 45, 66, 0, 0, 0, 46, 65, 0, 46, 23, 23, 24, 25, 65, 0, 0, 0, 0, 0, 44, 4, 4, 68, 0, 0, 45, 65, 0, 47, 24, 25, 26, 25, 66, 0, 0, 0, 0, 0, 46, 25, 25, 65, 0, 0, 46, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 23, 24, 25, 26, 23, 24, 25, 26, 23, 24, 25, 26, 23, 24, 25, 26, 23, 24, 25, 26];
		var _introMapCollision=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 22, 0, 0, 0, 22, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
         
		for(var _t=0; _t<_introMapCollision.length; _t++){
			_x=parseInt(_t % 20);
			_y=parseInt(_t / 20);
			this.tileLevelMap.putTile(_introMapCollision[_t]-1, _x, _y, this._introMapCollision);
			}

		this.tileLevelMapGraph = this.tileLevelMap.create("introTile", 20, 15, 40, 40);
		this.tileLevelMapGraph.sendToBack();
		this.tileLevelMapGraph.resizeWorld();
		this.tileLevelMapGraph.visible=false;

		for(var _t=0; _t<_introMap.length; _t++){
			_x=parseInt(_t % 20);
			_y=parseInt(_t / 20);
			this.tileLevelMap.putTile(_introMap[_t]-1, _x, _y, this.tileLevelMapGraph);
			}

		this.tileLevelMapLayer.sendToBack();

},	

destroyIntroTilemap:function(){
	//console.log("destroyIntroTilemap");
	if(this.tileLevelMap!=undefined){
	this.tileLevelMap.removeAllLayers()
	this.tileLevelMap.destroy();
	this.tileLevelMap=undefined;
	this.tileLevelMapGraph.destroy();
	this.tileLevelMapLayer.destroy();
	this.tileLevelMapGraph=undefined;
	this.tileLevelMapLayer=undefined;
	}
},

display:function(){

		groupMainMenu.visible=true;
		playersGroup.visible=true;
		this.intro4lands.visible=false;
		playersGroup.visible=true;
		this.introSky.visible=true;
		groupIntroStep2.visible=true;

		this.initStep1();

	},

hide:function(){

		this.newgameBtn.visible=false;
		this.newgameBtn.alpha=0;
		this.continuegameBtn.visible=false;
		this.continuegameBtn.alpha=0;

		groupMainMenu.visible=false;
		playersGroup.visible=false;
		groupIntroStep2.visible=false;
		groupLogo.visible=false;
		this.destroyIntroTilemap();
		this.intro4lands.visible=false;
		this.introSky.visible=false;
	},



playGame:function(){


	var _gameStored=protoGame.Game.loadGameData();
	if(_gameStored==null)
	{
		//first time so new play and create gameObj
		//clone the empty gameObj
		

		protoGame.Game.newGame();
		this.displayMap();

	}else{

		groupMenuBtn.visible=true;
		//display continue game or new game	
		this.newgameBtn.visible=true;
		this.newgameBtn.inputEnabled=true;
		this.newgameBtn.alpha=1;
		this.newgameBtn.bringToTop();

		this.continuegameBtn.visible=true;
		this.continuegameBtn.alpha=1;
		this.continuegameBtn.inputEnabled=true;
		this.continuegameBtn.bringToTop();

	}



},

newgame:function(){ 

	this.newgameBtn.inputEnabled=false;
	this.continuegameBtn.inputEnabled=false;
	protoGame.Game.clearGameData();
	protoGame.Game.newGame();
	this.displayMap();

},

continuegame:function(){

	this.newgameBtn.inputEnabled=false;
	this.continuegameBtn.inputEnabled=false;
	protoGame.Game.continueGameData();
	this.displayMap();

},



displayMap:function(){
//console.log("display map");
protoGame.Game.mainMenu.introShield.inputEnabled=false;
protoGame.Game.fade.show(function(){ 

	protoGame.Game.mainMenu.hide(); 

	protoGame.Game.map.display(); 
});

},
	

displayLogo:function(){

this.logoScroll.alpha=0;
this.logoScroll.angle=0;
this.logoScroll.y=100;
this.logoScrollUp.alpha=0;
this.logoScrollUp.angle=0;
this.logoScrollUp.y=80;
this.logoScrollDown.alpha=0;
this.logoScrollDown.angle=0;
this.logoScrollDown.y=180;
this.logoQuest.alpha=0;
this.logoSword.alpha=0;
this.introShield.alpha=0;
this.introShield.scale.set(1);
this.introEffect.alpha=0;
this.introEffect2.alpha=0;
this.logoPlay.alpha=0;


protoGame.Game.game.tweens.removeFrom(this.logoDaniel);
protoGame.Game.game.tweens.removeFrom(this.logoNoemi);
protoGame.Game.game.tweens.removeFrom(this.logoAnd);

protoGame.Game.game.tweens.removeFrom(this.logoScroll);
protoGame.Game.game.tweens.removeFrom(this.logoScrollUp);
protoGame.Game.game.tweens.removeFrom(this.logoScrollDown);
protoGame.Game.game.tweens.removeFrom(this.logoQuest);
protoGame.Game.game.tweens.removeFrom(this.logoSword);
protoGame.Game.game.tweens.removeFrom(this.introShield);
protoGame.Game.game.tweens.removeFrom(this.introEffect);
protoGame.Game.game.tweens.removeFrom(this.introEffect2);
protoGame.Game.game.tweens.removeFrom(this.logoPlay);

protoGame.Game.game.add.tween(this.logoDaniel).from({alpha:1,x:50}, 1000, Phaser.Easing.Quadratic.Out, true, 0);
protoGame.Game.game.add.tween(this.logoNoemi).from({alpha:1,x:490}, 1000, Phaser.Easing.Quadratic.Out, true, 0);
protoGame.Game.game.add.tween(this.logoAnd).from({alpha:1,y:50}, 1000, Phaser.Easing.Quadratic.Out, true, 0);

protoGame.Game.game.add.tween(this.logoScroll).to({alpha:1}, 1000, Phaser.Easing.Linear.None, true, 500);
protoGame.Game.game.add.tween(this.logoScroll).to({angle:-2}, 4200, Phaser.Easing.Quadratic.InOut, true, 1300,-1,true);

protoGame.Game.game.add.tween(this.logoScrollUp).to({alpha:1}, 1000, Phaser.Easing.Linear.None, true, 500);
protoGame.Game.game.add.tween(this.logoScrollUp).to({y:this.logoScrollUp.y-10,angle:-3}, 4000, Phaser.Easing.Quadratic.InOut, true, 1000,-1,true);

protoGame.Game.game.add.tween(this.logoScrollDown).to({alpha:1}, 1000, Phaser.Easing.Linear.None, true, 500);
protoGame.Game.game.add.tween(this.logoScrollDown).to({y:this.logoScrollDown.y+10,angle:2}, 4500, Phaser.Easing.Quadratic.InOut, true, 1500,-1,true);

protoGame.Game.game.add.tween(this.logoQuest).to({alpha:1}, 1200, Phaser.Easing.Linear.None, true, 1000);
protoGame.Game.game.add.tween(this.logoQuest).from({y:50}, 3000, Phaser.Easing.Quadratic.Out, true, 100);

protoGame.Game.game.add.tween(this.logoSword).to({alpha:1}, 1200, Phaser.Easing.Linear.None, true, 1100);
protoGame.Game.game.add.tween(this.logoSword).from({y:-50}, 3000, Phaser.Easing.Bounce.Out, true, 1000);

protoGame.Game.game.add.tween(this.introShield).to({alpha:1}, 1200, Phaser.Easing.Linear.None, true, 1600).onComplete.add(function(){

this.inputEnabled=true;

},this.introShield);
protoGame.Game.game.add.tween(this.introShield.scale).to({ x: .6, y: .6}, 2500, Phaser.Easing.Quadratic.InOut, true, 0,-1,true);

protoGame.Game.game.add.tween(this.introEffect).to({alpha:.4}, 1200, Phaser.Easing.Linear.None, true, 1900);
protoGame.Game.game.add.tween(this.introEffect).to({angle:360}, 15000, Phaser.Easing.Quadratic.InOut, true, 0,-1,true);
protoGame.Game.game.add.tween(this.introEffect.scale).to({ x: 0.4, y: .4}, 4500, Phaser.Easing.Quadratic.InOut, true, 0,-1,true);

protoGame.Game.game.add.tween(this.introEffect2).to({alpha:.4}, 1200, Phaser.Easing.Linear.None, true, 1900);
protoGame.Game.game.add.tween(this.introEffect2).to({angle:-360}, 14000, Phaser.Easing.Quadratic.InOut, true, 0,-1,true);
protoGame.Game.game.add.tween(this.introEffect2.scale).to({ x: 0.5, y: .5}, 3500, Phaser.Easing.Quadratic.InOut, true, 0,-1,true);

protoGame.Game.game.add.tween(this.logoPlay).to({alpha:1}, 1200, Phaser.Easing.Linear.None, true, 2100);


groupLogo.visible=true;

},

	
	initStep1:function(){ 
	
	this.introText.visible=true;
	protoGame.Game.gameState=protoGame.Game.gameStateIntro;

		this.introSky.inputEnabled=true;
		
		orbiterGroup.removeAll();

			var junk;
			for( var i=0; i<10; i++){
				
				junk = this.spawnNewOrbiter('introItems',0,0);
				junk.scale.set(1);
				junk.moveData.altitude = 1000;
				junk.moveData.altitudeMin = protoGame.Game.game.rnd.realInRange(10, 20);;
				junk.moveData.altitudeMax = 700;
				junk.moveData.altitudeChangeRate = protoGame.Game.game.rnd.realInRange(-1.0, -0.3); //-0.37; //game.rnd.realInRange(-1.0, 1.0);

				junk.moveData.orbit = 100;
				junk.moveData.orbitRate = protoGame.Game.game.rnd.realInRange(0.4, 1.2);

				junk.tumbleRate =protoGame.Game.game.rnd.realInRange(-10, -3);//  -6;//game.rnd.realInRange(-10, 10);
				
			
			}

	},


	

	skip:function(){

		//console.log("skip");
		protoGame.Game.mainMenu.skipBtn.inputEnabled=false;
		protoGame.Game.mainMenu.daniel.nuv.alpha=0;
		protoGame.Game.mainMenu.noemi.nuv.alpha=0;
		protoGame.Game.game.tweens.removeFrom(protoGame.Game.mainMenu.daniel);
		protoGame.Game.game.tweens.removeFrom(protoGame.Game.mainMenu.daniel.nuv);
		protoGame.Game.game.tweens.removeFrom(protoGame.Game.mainMenu.noemi);
		protoGame.Game.game.tweens.removeFrom(protoGame.Game.mainMenu.noemi.nuv);

		protoGame.Game.fade.show(function(){ protoGame.Game.mainMenu.showMainScreen(); });
		

	},

	showMainScreen:function(){

		this.introText.visible=false;
		groupIntroStep2.visible=true;
		this.introShield.inputEnabled=true;

		protoGame.Game.gameState=protoGame.Game.gameStateMainMenu;
		protoGame.Game.mainMenu.introStatus="end";
		
		protoGame.Game.game.tweens.removeFrom(protoGame.Game.mainMenu.hole);
		protoGame.Game.mainMenu.hole.alpha=0;

		

		for (var i=0; i<protoGame.Game.mainMenu.times.length; i++){

			protoGame.Game.game.time.events.remove(protoGame.Game.mainMenu.times[i]);
		}

		if(this.chests[0]!=undefined) this.chests[0].destroy();
		if(this.chests[1]!=undefined) this.chests[1].destroy();
		if(this.chests[2]!=undefined) this.chests[2].destroy();

		if(this.items[0]!=undefined) this.items[0].destroy();
		if(this.items[1]!=undefined) this.items[1].destroy();
		if(this.items[2]!=undefined) this.items[2].destroy();

		this.tweens=[];
		this.chests=[];
		this.itemsCount=0;

		this.chests.push(protoGame.Game.game.add.sprite(120,498, 'chests'));
		this.chests[0].frame=28;
		this.chests[0].scale.set(1.5);
		this.chests[0].anchor.set(.5);
		this.chests[0].bringToTop();
		groupIntroStep2.add(this.chests[0]);

		this.chests.push(protoGame.Game.game.add.sprite(160,137, 'chests'));
		this.chests[1].frame=27;
		this.chests[1].scale.set(1.5);
		this.chests[1].anchor.set(.5);
		this.chests[1].bringToTop();
		groupIntroStep2.add(this.chests[1]);

		this.chests.push(protoGame.Game.game.add.sprite(600,338, 'chests'));
		this.chests[2].frame=30;
		this.chests[2].scale.set(1.5);
		this.chests[2].anchor.set(.5);
		this.chests[2].bringToTop();
		groupIntroStep2.add(this.chests[2]);

		this.introSky.inputEnabled=false;
		//protoGame.Game.game.add.tween(this.skipBtn).to({alpha:1}, 500, Phaser.Easing.Linear.None, true, 0).onComplete.add(function(){ protoGame.Game.mainMenu.skipBtn.inputEnabled=true; });
		this.skipBtn.alpha=0;
		this.skipBtn.inputEnabled=false;
		this.skipBtn.bringToTop();

		
		this.noemi.revive();
		this.noemi.newarea.inputEnabled=false;
		this.noemi.alpha=0;
		this.noemi.angle=0;
		
		this.daniel.revive();
		this.daniel.newarea.inputEnabled=false;
		this.daniel.alpha=0;
		this.daniel.angle=0;

		this.intro4lands.visible=true;
		this.introRocks.visible=false;
		this.introRoad.visible=false;
		this.scrolling=false;
		this.isOrbitStarted=false;
		

		//console.log(this.tileLevelMap)
		if(this.tileLevelMap==undefined){

			this.initIntroTilemap();
			this.tileLevelMapLayer.visible=true;
			this.tileLevelMapGraph.visible=true;

		}
		
		
		this.intro4lands.sendToBack();
		this.introSky.sendToBack();

		orbiterGroup.remove(this.daniel);
		orbiterGroup.remove(this.noemi);
		orbiterGroup.visible=false;


				this.noemi.scale.set(1);
				this.noemi.alpha=1;
				this.noemi.angle=0;
				this.noemi.bringToTop();
				this.noemi.x=500;
				this.noemi.y=472;
				this.noemi.type=0;
				this.noemi.newarea.inputEnabled=true;
				if(this.noemi.body!=null) this.noemi.body.moves=false;
				this.noemi.nuv.alpha=0;
				this.noemi.isSaying=false;
				this.noemi.play('idleWorldDressed');
				this.noemi.anchor.set(.5);		
				groupIntroStep2.add(this.noemi);


				this.daniel.scale.set(1);
				this.daniel.alpha=1;
				this.daniel.angle=0;
				this.daniel.bringToTop();
				this.daniel.x=300;
				this.daniel.y=472;
				this.daniel.type=1;
				this.daniel.newarea.inputEnabled=true;
				if(this.daniel.body!=null) this.daniel.body.moves=false;
				this.daniel.nuv.alpha=0;
				this.daniel.isSaying=false;
				this.daniel.play('idleWorldDressed');
				this.daniel.anchor.set(.5);		
				groupIntroStep2.add(this.daniel);

		this.displayLogo();

		this.intro4lands.visible=true;
		playersGroup.visible=true;
		this.introSky.visible=true;

		this.restartBtn.alpha=1;
		this.restartBtn.visible=true;
		this.restartBtn.bringToTop();
		//console.log(this.restartBtn);
		protoGame.Game.game.add.tween(this.restartBtn).to({alpha:1}, 500, Phaser.Easing.Linear.None, true, 0).onComplete.add(function(){protoGame.Game.mainMenu.restartBtn.inputEnabled=true; });


		//console.log("showMainScreen!");



	},

	restart:function(){

		protoGame.Game.mainMenu.restartBtn.inputEnabled=false;
		protoGame.Game.fade.show(function(){ protoGame.Game.mainMenu.resetIntro(); });
	

	},


	resetIntro:function(){
		
		this.destroyIntroTilemap()
		groupLogo.visible=false;
		this.introText.visible=true;
		protoGame.Game.game.tweens.removeFrom(protoGame.Game.mainMenu.daniel);
		protoGame.Game.game.tweens.removeFrom(protoGame.Game.mainMenu.daniel.nuv);
		protoGame.Game.game.tweens.removeFrom(protoGame.Game.mainMenu.noemi);
		protoGame.Game.game.tweens.removeFrom(protoGame.Game.mainMenu.noemi.nuv);

		groupMenuBtn.visible=false;

		for (var i=0; i<protoGame.Game.mainMenu.times.length; i++){

			protoGame.Game.game.time.events.remove(protoGame.Game.mainMenu.times[i]);
		}
		
		if(this.chests[0]!=undefined) this.chests[0].destroy();
		if(this.chests[1]!=undefined) this.chests[1].destroy();
		if(this.chests[2]!=undefined) this.chests[2].destroy();

		if(this.items[0]!=undefined) this.items[0].destroy();
		if(this.items[1]!=undefined) this.items[1].destroy();
		if(this.items[2]!=undefined) this.items[2].destroy();

		this.tweens=[];
		this.chests=[];
		this.itemsCount=0;

		protoGame.Game.mainMenu.scrolling=true;
		protoGame.Game.mainMenu.isOrbitStarted=false;

		protoGame.Game.mainMenu.introStatus="beforeStart";
		protoGame.Game.mainMenu.introRocks.visible=true;
		protoGame.Game.mainMenu.introRoad.visible=true;

		this.daniel.angle=0;
		this.noemi.angle=0;
		this.daniel.x=110;
		this.noemi.x=70;
		this.daniel.y=440;
		this.noemi.y=500;

		orbiterGroup.remove(this.daniel);
		orbiterGroup.remove(this.noemi);

		playersGroup.add(this.noemi);
		playersGroup.add(this.daniel);

		if(this.noemi.body!=undefined)this.noemi.body.moves=false;
		
		if(this.daniel.body!=undefined)this.daniel.body.moves=false;

		this.daniel.isSaying=false;
		this.noemi.isSaying=false
		this.daniel.revive();
		this.noemi.revive();
		this.daniel.nuv.alpha=0;
		this.daniel.bringToTop();
		this.noemi.nuv.alpha=0;
		this.noemi.bringToTop();

		this.daniel.scale.set(1.5);
		this.noemi.scale.set(1.5);

		this.daniel.play("walk");
		this.noemi.play("walk");
		
		orbiterGroup.visible=false;

		protoGame.Game.mainMenu.hole.alpha=0;
		protoGame.Game.mainMenu.skipBtn.alpha=0;
		protoGame.Game.mainMenu.skipBtn.inputEnabled=false;
		protoGame.Game.mainMenu.restartBtn.alpha=0;
		protoGame.Game.mainMenu.restartBtn.inputEnabled=false;

		protoGame.Game.mainMenu.intro4lands.visible=false;

		protoGame.Game.mainMenu.initStep1(); 
		protoGame.Game.mainMenu.display();


	},


	

	

updateOrbiterMovement:function() {

	if(this.isOrbitStarted){


	if (orbiterGroup.countLiving()>0){

		orbiterGroup.forEach(function(orbiter) {
			if (orbiter.alive) {
				protoGame.Game.mainMenu.updateOrbiterOrbit(orbiter);
				protoGame.Game.mainMenu.updateOrbiterAltitude(orbiter);
			}
		});

	}else{

	/*	
	this.isOrbitStarted=false;

	protoGame.Game.game.add.tween(this.hole).to({alpha:0}, 1000, Phaser.Easing.Linear.None, true, 0).onComplete.add(function(){

		protoGame.Game.fade.show(function(){  protoGame.Game.mainMenu.initStep2(); });

	},this)
*/
	}
	

	}


},

newItem:function(x,y,type){


this.items.push(protoGame.Game.game.add.sprite(x,y, 'introItems2'));
index=this.items.length-1;
var _frame=0;

switch (type){
case "map": _frame=0; break;
case "wizard": _frame=1; break;
case "warrior": _frame=2; break;
}

this.items[index].frame=_frame;
this.items[index].scale.set(1.5);
this.items[index].index=index;
this.items[index].name=type;
protoGame.Game.game.physics.enable(this.items[index]);
				this.items[index].body.moves=true;
				this.items[index].body.bounce.set(0.3);
				this.items[index].anchor.set(.5);		
				this.items[index].body.velocity.y = -150;
				this.items[index].body.height=this.items[index].height-5;
				this.items[index].inputEnabled=true;
				this.items[index].alpha=0;
				protoGame.Game.game.add.tween(this.items[index]).to({alpha:1}, 500, Phaser.Easing.Quadratic.In, true, 0);
				this.items[index].events.onInputDown.add(function(_sprite){

					
					
					switch (_sprite.name){

						case "wizard":
							protoGame.Game.mainMenu.noemi.saySome("I found a wizard robe!");
							protoGame.Game.mainMenu.noemi.play("idleWorldDressed");
						break;

						case "warrior":
							protoGame.Game.mainMenu.daniel.saySome("I found a magic armor!");
							protoGame.Game.mainMenu.daniel.play("idleWorldDressed");
						break;

						case "map":
							protoGame.Game.mainMenu.daniel.saySome("We found a map!");
							protoGame.Game.mainMenu.noemi.saySome("We found a map!");
						break;


					}

_sprite.kill(); _sprite.destroy();

this.items[_sprite.index]=undefined;
this.itemsCount++;
if(this.itemsCount==3 ) {

	protoGame.Game.game.time.events.add(1000, this.displayLogo ,protoGame.Game.mainMenu);
	protoGame.Game.gameState=protoGame.Game.gameStateMainMenu;
	protoGame.Game.mainMenu.introStatus="end";
	this.skipBtn.alpha=0;
	this.skipBtn.inputEnabled=false;
	this.restartBtn.alpha=1;
	this.restartBtn.inputEnabled=true;

}

					 }, protoGame.Game.mainMenu);

groupIntroStep2.add(this.items[index]);


},

initStep2:function(){  
		
		this.isOrbitStarted=false;
		this.hole.alpha=0;
		orbiterGroup.removeAll();

		this.introText.visible=false;
		this.initIntroTilemap();

		protoGame.Game.gameState=protoGame.Game.gameStateIntroStep2;
		protoGame.Game.mainMenu.introStatus="newWorld";

		
		protoGame.Game.game.tweens.removeFrom(protoGame.Game.mainMenu.daniel);
		protoGame.Game.game.tweens.removeFrom(protoGame.Game.mainMenu.daniel.nuv);
		protoGame.Game.mainMenu.daniel.nuv.alpha=0;
		protoGame.Game.game.tweens.removeFrom(protoGame.Game.mainMenu.noemi);
		protoGame.Game.game.tweens.removeFrom(protoGame.Game.mainMenu.noemi.nuv); 
		protoGame.Game.mainMenu.noemi.nuv.alpha=0;

		this.noemi.revive();
		this.noemi.alpha=0;
		this.noemi.angle=0;
		this.noemi.nuv.alpha=0;
		
		this.daniel.revive();
		this.daniel.alpha=0;
		this.daniel.angle=0;
		this.daniel.nuv.alpha=0;

		//apply chests

		this.chests.push(protoGame.Game.game.add.sprite(120,498, 'chests'));
		this.chests[0].frame=1;
		this.chests[0].scale.set(1.5);
		this.chests[0].anchor.set(.5);
		var anim=this.chests[0].animations.add('open', [10,19,28], 6, false);
		anim.onComplete.add(function(){ protoGame.Game.mainMenu.newItem(protoGame.Game.mainMenu.chests[0].x,protoGame.Game.mainMenu.chests[0].y,"map");}, this._chest);
		this.chests[0].inputEnabled=true;
		this.chests[0].events.onInputDown.add(function(_sprite){_sprite.inputEnabled=false; _sprite.play('open'); }, this.chests[0]);
		playersGroup.add(this.chests[0]);

		this.chests.push(protoGame.Game.game.add.sprite(160,137, 'chests'));
		this.chests[1].frame=0;
		this.chests[1].scale.set(1.5);
		this.chests[1].anchor.set(.5);
		var anim1=this.chests[1].animations.add('open', [9,18,27], 6, false);
		anim1.onComplete.add(function(){ protoGame.Game.mainMenu.newItem(protoGame.Game.mainMenu.chests[1].x,protoGame.Game.mainMenu.chests[1].y,"warrior");}, this._chest2);
		this.chests[1].inputEnabled=true;
		this.chests[1].events.onInputDown.add(function(_sprite){_sprite.inputEnabled=false; _sprite.play('open'); }, this.chests[1]);
		playersGroup.add(this.chests[1]);

		this.chests.push(protoGame.Game.game.add.sprite(600,338, 'chests'));
		this.chests[2].frame=3;
		this.chests[2].scale.set(1.5);
		this.chests[2].anchor.set(.5);
		var anim2=this.chests[2].animations.add('open', [12,21,30], 6, false);
		anim2.onComplete.add(function(){ protoGame.Game.mainMenu.newItem(protoGame.Game.mainMenu.chests[2].x,protoGame.Game.mainMenu.chests[2].y,"wizard");}, this._chest3);
		this.chests[2].inputEnabled=true;
		this.chests[2].events.onInputDown.add(function(_sprite){_sprite.inputEnabled=false; _sprite.play('open'); }, this.chests[2]);
		playersGroup.add(this.chests[2]);

		this.introSky.inputEnabled=false;
		protoGame.Game.game.add.tween(this.skipBtn).to({alpha:1}, 500, Phaser.Easing.Linear.None, true, 0).onComplete.add(function(){ protoGame.Game.mainMenu.skipBtn.inputEnabled=true; });
		this.skipBtn.bringToTop();
		
		this.intro4lands.visible=true;
		this.introRocks.visible=false;
		this.introRoad.visible=false;
		this.scrolling=false;
		this.isOrbitStarted=false;
		
		this.tileLevelMapLayer.visible=true;
		this.tileLevelMapGraph.visible=true;
		
		this.intro4lands.sendToBack();
		this.introSky.sendToBack();

		this.hole.x=400;
		this.hole.y=300;
		this.hole.scale.set(1.5);
		this.hole.play('idle');

		protoGame.Game.game.add.tween(this.hole).to({alpha:1}, 1000, Phaser.Easing.Linear.None, true, 1000).onComplete.add(function(){

			this.times.push(protoGame.Game.game.time.events.add(0, function(){  this.saySome("AHHHHHHHHHHHH!!!"); },this.daniel));
			this.times.push(protoGame.Game.game.time.events.add(0, function(){  this.saySome("AHHHHHHHHHHHH!!!"); },this.noemi));
			this.times.push(protoGame.Game.game.time.events.add(4000, function(){  this.saySome("where are we now??!?"); },this.daniel));
			this.times.push(protoGame.Game.game.time.events.add(6000, function(){  this.saySome("I don't know!!!"); },this.noemi));
			this.times.push(protoGame.Game.game.time.events.add(9000, function(){  this.saySome("Let's look around!!!"); },this.daniel));


				this.noemi.scale.set(1);
				this.noemi.bringToTop();
				this.noemi.x=400;
				this.noemi.y=300;
				this.noemi.type=0;
				this.noemi.isSaying=false;
				this.noemi.play('front');
				this.noemi.collide=0;
				this.noemi.isDisappearing=false;
				protoGame.Game.game.physics.enable(this.noemi);
				this.noemi.body.moves=true;
				this.noemi.body.bounce.set(0.3);
				this.noemi.anchor.set(.5);		
				this.noemi.body.velocity.y = -140;
				this.noemi.body.velocity.x = +30;
				this.noemi.body.height=this.noemi.height-5;
				groupIntroStep2.add(this.noemi);
				protoGame.Game.game.add.tween(this.noemi).to({alpha:1}, 500, Phaser.Easing.Linear.None, true, 0);

				this.daniel.scale.set(1);
				this.daniel.bringToTop();
				this.daniel.x=400;
				this.daniel.y=300;
				this.daniel.isSaying=false;
				this.daniel.play('front');
				this.daniel.type=0;
				this.daniel.collide=0;
				this.daniel.isDisappearing=false;
				protoGame.Game.game.physics.enable(this.daniel);
				this.daniel.body.moves=true;
				this.daniel.body.bounce.set(0.3);	
				this.daniel.anchor.set(.5);			
				this.daniel.body.velocity.y = -150;
				this.daniel.body.velocity.x = -28;
				this.daniel.body.height=this.daniel.height-5;
				groupIntroStep2.add(this.daniel);
				protoGame.Game.game.add.tween(this.daniel).to({alpha:1}, 500, Phaser.Easing.Linear.None, true, 0);

				protoGame.Game.game.time.events.add(3000, function(){  

					//console.log("hide hole");
					protoGame.Game.game.add.tween(this.hole).to({alpha:0}, 1000, Phaser.Easing.Linear.None, true, 0);
				

				},this);
		

		},this);

		
		


		//console.log("ciao")
	//protoGame.Game.fade.show(function(){ console.log("ciao");});


},

collisionHandler:function(_sprite, _tile){

if(_sprite.type==0){

	_sprite.collide +=1;
	if(_sprite.collide>3){ 

		_sprite.body.moves=false; 
		_sprite.play("idleWorld"); 
		_sprite.newarea.inputEnabled=true; 
		protoGame.Game.mainMenu.introStatus="landed";


	}
}

//console.log(_sprite);

},

 updateOrbiterOrbit:function(orbiter) {

	var orbitRate = orbiter.moveData.orbitRate;

	if (orbiter.moveData.orbitRate != 0) {
		orbiter.moveData.orbit -= orbitRate;
		if (orbiter.moveData.orbit >= 360) {
			orbiter.moveData.orbit -= 360;
		}
	}

	var orbitRad = Phaser.Math.degToRad(orbiter.moveData.orbit);
	//orbiter.x = game.world.width / 2 + orbiter.moveData.altitude * Math.cos(orbitRad);
	//orbiter.y = game.world.height / 2 + orbiter.moveData.altitude * Math.sin(orbitRad);
	
	orbiter.x = protoGame.Game.mainMenu.start.x + orbiter.moveData.altitude * Math.cos(orbitRad);
	orbiter.y = protoGame.Game.mainMenu.start.y + orbiter.moveData.altitude * Math.sin(orbitRad);
	orbiter.scale.set((orbiter.moveData.altitude/1000)+1)
	
	//1000/orbiter.moveData.altitude = 1 : 0
	//console.log(orbiter.moveData.altitude/1000);	

	orbiter.angle += orbiter.tumbleRate;
	
	
},


updateOrbiterAltitude:function(orbiter) {

	if (orbiter.moveData.altitudeChangeRate != 0) {
		orbiter.moveData.altitude = Phaser.Math.clamp(orbiter.moveData.altitude + orbiter.moveData.altitudeChangeRate, orbiter.moveData.altitudeMin, orbiter.moveData.altitudeMax);
		
		/*if (orbiter.moveData.altitudeTarget != 0) {
			if (orbiter.moveData.altitude >= orbiter.moveData.altitudeTarget) {
				orbiter.moveData.altitudeMin = 60;
				orbiter.moveData.altitudeChangeRate = 0;
				orbiter.moveData.altitudeTarget = 0;
			}
		}*/
	}


	

		if (orbiter.moveData.altitude < 30 ) {

			if (orbiter.isDisappearing==false){

				orbiter.isDisappearing=true;

				if(orbiter.nuv!=undefined){
					protoGame.Game.game.add.tween(orbiter.nuv).to({alpha:0}, 500, Phaser.Easing.Linear.None, true, 0).onComplete.add(function(){

						orbiter.newarea.inputEnabled=false;

					});

				}


				protoGame.Game.game.add.tween(orbiter).to({alpha:0}, 500, Phaser.Easing.Linear.None, true, 0).onComplete.add(function(){

					if(orbiter.name!="Noemi" && orbiter.name!="Daniel"){
						orbiter.kill(); orbiter.destroy();
					}else{

						orbiterND++;

						orbiter.kill();
						if(orbiterND==2){orbiterND=0; protoGame.Game.fade.show(function(){  protoGame.Game.mainMenu.initStep2(); }); console.log("step 2")}
					}
					

				},this);

			}
		
	}

},

spawnNewOrbiter:function(graphic,x,y) {

	if(x==undefined) x=0;
	if(y==undefined) y=0;
	var orbiter = protoGame.Game.game.add.sprite(x, y, graphic);
	orbiter.frame= protoGame.Game.game.rnd.integerInRange(10, 19);

	orbiter.isDisappearing=false;
	orbiter.anchor.setTo(0.5, 0.5);

	orbiter.moveData = {};
	orbiter.moveData.altitude = 0;
	orbiter.moveData.altitudeTarget = 0;
	orbiter.moveData.altitudeChangeRate = 0;
	orbiter.moveData.altitudeMin = 0;
	orbiter.moveData.altitudeMax = 0;
	orbiter.moveData.orbit = 0;
	orbiter.moveData.orbitRate = 0;

	orbiterGroup.add(orbiter);

	return orbiter;

}

	
	
		
		
		
	
	}
var orbiterND=0;	
	