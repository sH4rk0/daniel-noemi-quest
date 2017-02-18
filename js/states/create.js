// JavaScript Document
var protoGame = protoGame || {};


protoGame.Game.prototype.create=function(){
		
		GroupWeapons = this.game.add.group();
	
		protoGame.Game.game=this.game;
		
		protoGame.Game.gameState;
		protoGame.Game.gameStateMainMenu = 'gameStateMainMenu';
		protoGame.Game.gameStateIntro = 'gameStateIntro';
		protoGame.Game.gameStateIntroStep2 = 'gameStateIntroStep2';

		protoGame.Game.gameStateMap = 'gameStateMap';
		protoGame.Game.gameStatePlayingLevel = 'gameStatePlayingLevel';
		protoGame.Game.gameStateGameover = 'gameStateGameover';
		protoGame.Game.gameStateBonusStage = 'gameStateBonusStage';
		
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.arcade.gravity.y = 200;


		//this.game.time.desiredFps = 60;
    	//this.game.time.slowMotion = 4.0;

    	//this.game.add.tween(this.game.time).to({slowMotion:4}, 2000, Phaser.Easing.Linear.None, true,0)
    	//.onComplete.add(function(){  this.game.time.slowMotion=0;  },this);
	
		
		//groups
		groupMainMenu = this.game.add.group();
		groupIntroStep2 = this.game.add.group();
		groupMainMenu.visible=false;
		groupLogo = this.game.add.group();
		groupLogo.visible=false;
		groupMenuBtn  = this.game.add.group();
		groupMenuBtn.visible=false;

		groupStory = this.game.add.group();
		groupMap = this.game.add.group();
		groupMap.visible=false;

		groupLevel = this.game.add.group();

			groupPlayers = this.game.add.group();
			groupEnemies = this.game.add.group();
			groupBonuses = this.game.add.group();
			groupEnemiesWeapons = this.game.add.group();
			groupPlayersWeapons = this.game.add.group();
			groupEnemiesDeath = this.game.add.group();

		groupLevel.add(groupPlayers);
		groupLevel.add(groupEnemies);
		groupLevel.add(groupBonuses);
		groupLevel.add(groupEnemiesWeapons);
		groupLevel.add(groupEnemiesDeath);
		groupLevel.add(groupPlayersWeapons);
		groupLevel.visible=false;

		groupLevelMessages = this.game.add.group();
		groupLevelMessages.fixedToCamera=true;

		groupGameover = this.game.add.group();

		groupDice = this.game.add.group();
		groupDice.fixedToCamera=true;
		groupDiceBonus = this.game.add.group();
		groupDiceBonus.fixedToCamera=true;

		groupFade = this.game.add.group();

		//init fade mechanism
		protoGame.Game.playingLevel.init();
		protoGame.Game.mainMenu.init();
		protoGame.Game.map.init();
		protoGame.Game.fade.init();
		


			//this.test=protoGame.Game.game.add.sprite(0,0, "Noemi");

			//this.test.animations.add("test", [48,49,50,51,52,53,54,55], 5, true);
			//this.test.animations.add("test", [60,61,62,63,64,65,66,67], 5, true);
			//this.test.play("test")

		//protoGame.Game.map.display();

		
		//protoGame.Game.fade.show('diagonal',function(){ console.log("ciao");});

		//protoGame.Game.playingLevel.display();
		protoGame.Game.mainMenu.display();
		
		//this.weapons.initSequences();
		//protoGame.Game.timer=new Phaser.Timer(this,true);
		//protoGame.Game.timer.start();
		
		
		
		}
	

