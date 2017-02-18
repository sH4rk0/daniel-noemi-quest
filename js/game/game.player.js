
var PlayersNuv=[];

Player = function (x,y,index,health) {

		Phaser.Sprite.call(this, protoGame.Game.game, x, y, protoGame.Game.settings.getPlayerName(index));

		this.startPositionX=x;
		this.startPositionY=y;
		this.index=index;
		this.inputEnabled=false;
		this.startHealth=health;
		this.health=health;
		this.isSaying=false;
		this.action=null;
		this.level=2;
		this.events.onInputDown.add(this.selectPlayer, this);
		this.anchor.set(0.5);
		this.player=index;
		this.isDown=false;
		this.submitted=false;
		this.name=protoGame.Game.settings.getPlayerName(index);
		var _anim=protoGame.Game.settings.getPlayerAnimations(index);

		for (var a=0; a<_anim.length; a++){

			this.animations.add(_anim[a].anim, _anim[a].frames, _anim[a].speed, _anim[a].loop);

		}
		
		this.isDisappearing=false;

		this.moveData={};
		this.moveData.altitude = 0;
		this.moveData.altitudeMin = protoGame.Game.game.rnd.realInRange(10, 20);
		this.moveData.altitudeMax = 700;
		this.moveData.altitudeChangeRate = protoGame.Game.game.rnd.realInRange(-1.0, -0.3);
		this.moveData.orbit = 0;
		this.moveData.orbitRate = protoGame.Game.game.rnd.realInRange(0.4, 1.2);
		this.tumbleRate =protoGame.Game.game.rnd.realInRange(-10, -3);

		/* 
		---------------*/
		this.newarea=protoGame.Game.game.add.sprite(0,0, protoGame.Game.game.cache.getBitmapData('hitarea'));
		this.newarea.inputEnabled=true;
		this.newarea.scale.set(1.5);
		this.newarea.alpha=0;
		this.newarea.anchor.set(.5)
		this.newarea.events.onInputDown.add(function(){this.saySome();}, this);

		this.nuv=protoGame.Game.game.add.sprite(0,0,"baloon");
		this.nuv.alpha=0;
		var _style={font: 'normal 8px', fill: '#000000', stroke:'#ff0000', strokeThickness:0};
		this.nuv.say = protoGame.Game.game.add.text(5, 8, '', _style);
		this.nuv.say.font='Press Start 2P';
		this.nuv.addChild(this.nuv.say);


		this.shield=protoGame.Game.game.add.sprite(0,0,"shield"+this.index);
		this.shield.anchor.set(.5);
		this.shield.x=this.x;
		this.shield.y=this.y;
		this.shield.scale.set(.75)
		this.shield.visible=false;

		this.shield.animations.add("shield", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19], 10, true);
		this.shield.play("shield");

		var _styleS={fill: '#ffffff', fontSize: 20, stroke:'#ff0000', strokeThickness:5};
			this.shieldValue = protoGame.Game.game.add.text(0, 0, "", _styleS);
			this.shieldValue.font = 'Press Start 2P';
			this.shieldValue.anchor.set(0.5,2);
			this.shield.addChild(this.shieldValue);
		
		groupLevel.add(this.shield);
		

		/* 
		---------------*/

		var _style={fill: '#000000', fontSize: 8, stroke:'#ffffff', strokeThickness:3};
			this.healthText = protoGame.Game.game.add.text(0, 0, this.startHealth+"/"+this.startHealth, _style);
			this.healthText.font = 'Press Start 2P';
			this.healthText.anchor.set(0.5,1.6);
			this.addChild(this.healthText);

		groupPlayers.add(this);
			

/*
player menu
-----------------------------------*/
		protoGame.Game.playingLevel.groupMenuPlayer.push( protoGame.Game.game.add.group());
		protoGame.Game.playingLevel.groupMenuSelectionPlayer.push(protoGame.Game.game.add.group());

		protoGame.Game.playingLevel.groupMenuSelectionPlayer[index].x=0;
		protoGame.Game.playingLevel.groupMenuSelectionPlayer[index].y=0;
		groupLevel.add(protoGame.Game.playingLevel.groupMenuPlayer[index]);
		groupLevel.add(protoGame.Game.playingLevel.groupMenuSelectionPlayer[index]);
		
		var _backMenu1=protoGame.Game.game.add.sprite(0,-20, "menu");
		protoGame.Game.playingLevel.groupMenuPlayer[index].add(_backMenu1);
		
		
		for (var _a=0; _a<5; _a++){
			_btn=protoGame.Game.game.add.sprite((45*_a)+100,40, "btn_"+index+"_"+_a);
			_btn.events.onInputDown.add(this.selectAction, this);
			_btn.inputEnabled=true;
			_btn.alpha=0.2;
			if(_a==2) _btn.alpha=1;
			_btn.action=_a;
			protoGame.Game.playingLevel.groupMenuSelectionPlayer[index].add(_btn);
		}
		protoGame.Game.playingLevel.groupMenuPlayer[index].add(protoGame.Game.playingLevel.groupMenuSelectionPlayer[index]);
		
		_btn=protoGame.Game.game.add.sprite(210,115, "btn1");
		_btn.events.onInputDown.add(this.submitAction, this);
		_btn.inputEnabled=true;
		_btn.anchor.set(.5);
		var _style={font: 'normal 18px', fill: '#ffffff', stroke:'#583a20', strokeThickness:5};
		var _actiontext = protoGame.Game.game.add.text(0, 0, 'Action', _style);
		_actiontext.font='Press Start 2P';
		_actiontext.anchor.set(.5,.3);
		_btn.addChild(_actiontext);



		var _styleLabel={fill: '#ffffff', fontSize: 10, stroke:'#ff0000', strokeThickness:0};
			_shieldLabel = protoGame.Game.game.add.text(80, 30, "Defence", _styleLabel);
			_shieldLabel.font = 'Press Start 2P';
			_shieldLabel.anchor.set(0.5);
			protoGame.Game.playingLevel.groupMenuPlayer[index].add(_shieldLabel);

			_shieldLabel2 = protoGame.Game.game.add.text(340, 30, "Attack", _styleLabel);
			_shieldLabel2.font = 'Press Start 2P';
			_shieldLabel2.anchor.set(0.5);
			protoGame.Game.playingLevel.groupMenuPlayer[index].add(_shieldLabel2);


		protoGame.Game.playingLevel.groupMenuPlayer[index].add(_btn);
		
		protoGame.Game.playingLevel.menuDefence.push(protoGame.Game.game.add.sprite(70,70, "defence_"+index));
		protoGame.Game.playingLevel.menuDefence[index].anchor.set(.5);
		protoGame.Game.playingLevel.groupMenuPlayer[index].add(protoGame.Game.playingLevel.menuDefence[index]);

		protoGame.Game.playingLevel.menuAttack.push(protoGame.Game.game.add.sprite(350,70, "attack_"+index));
		protoGame.Game.playingLevel.menuAttack[index].anchor.set(.5);
		protoGame.Game.playingLevel.groupMenuPlayer[index].add(protoGame.Game.playingLevel.menuAttack[index]);
		
		protoGame.Game.playingLevel.groupMenuPlayer[index].x=-380;
		protoGame.Game.playingLevel.groupMenuPlayer[index].y=300;



			
		/*start custom enemy area + spriter animation*/

/*
			this.newarea=protoGame.Game.game.add.sprite(0,0, protoGame.Game.game.cache.getBitmapData('hitarea'));
			this.addChild(this.newarea);
			this.newarea.inputEnabled=true;
			this.newarea.alpha=1;
			this.newarea.anchor.set(.5)
			this.newarea.events.onInputDown.add(function(){ this._spriterGroup.playAnimationById(1);} , this.testsprite);

 			var spriterLoader = new Spriter.Loader();
            var spriterFile = new Spriter.SpriterJSON(protoGame.Game.game.cache.getJSON("TESTJson"));
            var spriterData = spriterLoader.load(spriterFile);

            this._spriterGroup = new Spriter.SpriterGroup(protoGame.Game.game, spriterData, "TEST", "Hero", 0, 100);
            this._spriterGroup.onVariableSet.add(function (spriter, variable) { this._text = variable.string; }, this);

            this.addChild(this._spriterGroup)
*/
		/*end custom enemy area + spriter animation*/




};

Player.Weapons={};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.reset = function(){

	this.x=this.startPositionX;
	this.y=this.startPositionY;
	this.angle=0;
	this.inputEnabled=true;
	this.isDown=false;
	this.alpha=1;
	this.revive();
	this.newarea.inputEnabled=false;
	this.healthText.visible=true;
	this.bringToTop();
	this.scale.set(1);
	this.healthText.text=this.startHealth+"/"+this.startHealth;
	this.health=this.startHealth;
	this.disableShield();
	groupPlayers.add(this);


}


Player.prototype.update = function() {

//console.log(this.x,this.y);
this.nuv.x=this.x-30;
this.nuv.y=this.y-70;

this.newarea.x=this.x;
this.newarea.y=this.y;

this.shield.x=this.x;
this.shield.y=this.y;

};

Player.prototype.enableShield = function(_value) {

//console.log("enableShield")
var shieldVal=parseInt(this.shieldValue.text);
if (isNaN(shieldVal) ) shieldVal=0;
//console.log("enableShield",shieldVal);

if(shieldVal>0){

	shieldVal+=_value;
	

	}else{
shieldVal+=_value;
this.shield.visible=true;
this.shield.alpha=1;

this.shield.bringToTop();
this.shield.play("shield");

}
this.shieldValue.text=shieldVal;


}


Player.prototype.damage = function(_damage) {

//console.log(_damage)
		var shieldVal=parseInt(this.shieldValue.text);
		if (isNaN(shieldVal)) shieldVal=0;
		var _end;

		
		if(shieldVal>0){

			//console.log("damage",_damage,"shieldVal",shieldVal)
			_end=shieldVal-_damage;
			this.shieldValue.text=_end;
			if(_end<=0) { this.disableShield();}

		}
		else{

			//console.log("damage",_damage);

			_end=this.health-_damage;
			if(_end<=0) {_end=0; this.healthText.visible=false; this.down();}
			this.tweenScore(this.healthText,this.health,_end);

			this.health-=_damage;

		}


};

Player.prototype.tweenScore = function(obj,start,end) {

	var _total=this.startHealth;
        var scoreValue = {};
        scoreValue.score = start;
        var scoreTween = protoGame.Game.game.add.tween(scoreValue).to({score: end}, 1000, Phaser.Easing.Quadratic.Out);

        scoreTween.onUpdateCallback(function() {
        	//console.log(parseInt(scoreValue.score))
          obj.text = _total+"/"+parseInt(scoreValue.score);
        });

        scoreTween.start();    
    };

Player.prototype.disableShield = function(_value) {


this.shield.visible=false;

this.shieldValue.text="";


}

Player.prototype.attack = function(_target) {

	//console.log(this.level);
	var isLast=false;
	switch (protoGame.Game.playingLevel.selectedPlayer){
				
				

				case 0: //player 0
				
								switch(this.level){

									case 0:
									case 1:
									case 2:
									case 3:
									case 4:
										for (var _t=0; _t<protoGame.Game.action.targets.length; _t++){

											if(_t==protoGame.Game.action.targets.length-1){isLast=true;}
											new Player.Weapons.Sword(protoGame.Game.action.targets[_t],_t,isLast,this);
										
										}

									break;

									


								}
								
								
					
				
				
				break;
				
				case 1: //player 1
				
								switch(this.level){

									case 0:
										for (var _t=0; _t<protoGame.Game.action.targets.length; _t++){

												if(_t==protoGame.Game.action.targets.length-1){isLast=true;}
												new Player.Weapons.Spell(protoGame.Game.action.targets[_t],_t,isLast);
											
											}
									case 1:
									
									
									for (var _t=0; _t<protoGame.Game.action.targets.length; _t++){

											if(_t==protoGame.Game.action.targets.length-1){isLast=true;}
											new Player.Weapons.Rockstorm(protoGame.Game.action.targets[_t],_t,isLast,this);
										
										}
										
									break;

									case 2:
									for (var _t=0; _t<protoGame.Game.action.targets.length; _t++){

											if(_t==protoGame.Game.action.targets.length-1){isLast=true;}
											new Player.Weapons.Firestorm(protoGame.Game.action.targets[_t],_t,isLast,this);
										
										}

									break;


									case 3:
									for (var _t=0; _t<protoGame.Game.action.targets.length; _t++){

											if(_t==protoGame.Game.action.targets.length-1){isLast=true;}
											new Player.Weapons.Icestorm(protoGame.Game.action.targets[_t],_t,isLast,this);
										
										}

									break;

									case 4:	

										for (var _t=0; _t<protoGame.Game.action.targets.length; _t++){

											if(_t==protoGame.Game.action.targets.length-1){isLast=true;}
											new Player.Weapons.Thunderstorm(protoGame.Game.action.targets[_t],_t,isLast,this);
										
										}

									break;


								}
						
				
				break;
				
				}


};

Player.prototype.moveNextMap = function() {

		this.inputEnabled=false;
		this.x=(protoGame.Game.playingLevel.mapStep*800)-40;
		this.alpha=1;
		this.play('walkDressed');
		this.submitted=true;
				
		protoGame.Game.game.add.tween(this)
		.to({ x: ((protoGame.Game.playingLevel.mapStep*800)+40)+this.startPositionX }, 2000, Phaser.Easing.Linear.None, true,1000)	
		.onComplete.add(function(){ this.play('idle'); this.inputEnabled=true; this.submitted=false;},this);

};

//Enemy.prototype.killed = function() { console.log("killed")}


Player.prototype.down = function(){

	if(this.isDown) return;
	//console.log(this.name+" is down");
	this.play('down');
	
	this.death=protoGame.Game.game.add.sprite(this.x,this.y-15,"death");
	this.death.events.onInputDown.add(this.miracle, this);
	this.death.inputEnabled=true;
	this.death.anchor.set(.5,0);
	this.death.scale.set(1.5);
	this.death.animations.add("death", [0,1,2,3,4,5,6], 10, false);
	this.death.play("death");

	var _zot=protoGame.Game.game.add.sprite(this.x,this.y+8, 'rockGround');
			var anim = _zot.animations.add('zot', [0,1,2,3,4,5,6,7,8,9,10,11], 9, false);
			_zot.play('zot');
			_zot.scale.set(.5);
			_zot.anchor.set(.5,0);
			
			anim.onComplete.add(function(zot){ zot.kill(); zot.destroy();},_zot)

				



	this.inputEnabled=false;
	this.isDown=true;
	this.action=true;

};


Player.prototype.miracle = function(){

	this.death.kill();

	this.inputEnabled=true;
	this.isDown=false;
	this.action=false;
	this.play('idle');

}



Player.prototype.outGroupMenuPlayer = function(_who){ 

		protoGame.Game.game.add.tween(protoGame.Game.playingLevel.groupMenuPlayer[_who]).to({alpha:0}, 300, Phaser.Easing.Linear.None, true,0)
		.onComplete.add(function(){ protoGame.Game.playingLevel.groupMenuPlayer[_who].x=-380; 
									protoGame.Game.playingLevel.players[protoGame.Game.playingLevel.selectedPlayer].submitted=false;  
									},this);
	


	};
	
Player.prototype.inGroupMenuPlayer = function(_who){ 

	protoGame.Game.playingLevel.groupMenuPlayer[_who].alpha=0;
	protoGame.Game.playingLevel.groupMenuPlayer[_who].x=((protoGame.Game.playingLevel.mapStep*800)+40)-180;

	protoGame.Game.game.add.tween(protoGame.Game.playingLevel.groupMenuPlayer[_who]).to({alpha:1,x:((protoGame.Game.playingLevel.mapStep*800)+40)}, 300, Phaser.Easing.Quadratic.Out, true,0);
		
	};



Player.prototype.selectPlayer= function(_selected) { 

					
		if(this.action) return;
		
		if(!protoGame.Game.playingLevel.playerToggle) return;
		
		if(protoGame.Game.playingLevel.selectedPlayer==_selected.player) return;
		
		protoGame.Game.playingLevel.selectedPlayer=_selected.player;
		
		groupPlayers.forEach(function(_player){ _player.alpha=0.5; });
			
		_selected.alpha=1;
		
			var _otherPlayer=1;
			if(_selected.player==1) _otherPlayer=0;
		
			this.outGroupMenuPlayer(_otherPlayer);
			this.inGroupMenuPlayer(_selected.player);

 };





Player.prototype.selectAction = function(_selected){
			
			protoGame.Game.playingLevel.groupMenuSelectionPlayer[protoGame.Game.playingLevel.selectedPlayer].forEach(function(_sprite){ _sprite.alpha=0.2; });
			_selected.alpha=1;


			switch (protoGame.Game.playingLevel.selectedPlayer){
				
				

				case 0: //player 0
				case 1:
					switch(_selected.action){

						case 0:

						protoGame.Game.game.add.tween(protoGame.Game.playingLevel.menuAttack[protoGame.Game.playingLevel.selectedPlayer].scale).to({x: .8, y:.8}, 500, Phaser.Easing.Back.Out, true, 0);
						protoGame.Game.game.add.tween(protoGame.Game.playingLevel.menuAttack[protoGame.Game.playingLevel.selectedPlayer]).to({alpha:.5}, 500, Phaser.Easing.Linear.None, true, 0);

						protoGame.Game.game.add.tween(protoGame.Game.playingLevel.menuDefence[protoGame.Game.playingLevel.selectedPlayer].scale).to({x: 1.2, y:1.2,alpha:1}, 500, Phaser.Easing.Back.Out, true, 0);
						protoGame.Game.game.add.tween(protoGame.Game.playingLevel.menuDefence[protoGame.Game.playingLevel.selectedPlayer]).to({alpha:1}, 500, Phaser.Easing.Linear.None, true, 0);
						break;

						case 1:
						protoGame.Game.game.add.tween(protoGame.Game.playingLevel.menuAttack[protoGame.Game.playingLevel.selectedPlayer].scale).to({x: .9, y:.9}, 500, Phaser.Easing.Back.Out, true, 0);
						protoGame.Game.game.add.tween(protoGame.Game.playingLevel.menuAttack[protoGame.Game.playingLevel.selectedPlayer]).to({alpha:.7}, 500, Phaser.Easing.Back.Out, true, 0);

						protoGame.Game.game.add.tween(protoGame.Game.playingLevel.menuDefence[protoGame.Game.playingLevel.selectedPlayer].scale).to({x: 1.1, y:1.1}, 500, Phaser.Easing.Back.Out, true, 0);
						protoGame.Game.game.add.tween(protoGame.Game.playingLevel.menuDefence[protoGame.Game.playingLevel.selectedPlayer]).to({alpha:.9}, 500, Phaser.Easing.Linear.None, true, 0);
						break;

						case 2:
						protoGame.Game.game.add.tween(protoGame.Game.playingLevel.menuAttack[protoGame.Game.playingLevel.selectedPlayer].scale).to({x: 1, y:1}, 500, Phaser.Easing.Back.Out, true, 0);
						protoGame.Game.game.add.tween(protoGame.Game.playingLevel.menuAttack[protoGame.Game.playingLevel.selectedPlayer]).to({alpha:.8}, 500, Phaser.Easing.Linear.None, true, 0);

						protoGame.Game.game.add.tween(protoGame.Game.playingLevel.menuDefence[protoGame.Game.playingLevel.selectedPlayer].scale).to({x: 1, y:1}, 500, Phaser.Easing.Back.Out, true, 0);
						protoGame.Game.game.add.tween(protoGame.Game.playingLevel.menuDefence[protoGame.Game.playingLevel.selectedPlayer]).to({alpha:.8}, 500, Phaser.Easing.Linear.None, true, 0);
						break;

						case 3:
						protoGame.Game.game.add.tween(protoGame.Game.playingLevel.menuAttack[protoGame.Game.playingLevel.selectedPlayer].scale).to({x: 1.1, y:1.1}, 500, Phaser.Easing.Back.Out, true, 0);
						protoGame.Game.game.add.tween(protoGame.Game.playingLevel.menuAttack[protoGame.Game.playingLevel.selectedPlayer]).to({alpha:.9}, 500, Phaser.Easing.Linear.None, true, 0);

						protoGame.Game.game.add.tween(protoGame.Game.playingLevel.menuDefence[protoGame.Game.playingLevel.selectedPlayer].scale).to({x: .9, y:.9}, 500, Phaser.Easing.Back.Out, true, 0);
						protoGame.Game.game.add.tween(protoGame.Game.playingLevel.menuDefence[protoGame.Game.playingLevel.selectedPlayer]).to({alpha:.7}, 500, Phaser.Easing.Linear.None, true, 0);
						break;

						case 4:
						protoGame.Game.game.add.tween(protoGame.Game.playingLevel.menuAttack[protoGame.Game.playingLevel.selectedPlayer].scale).to({x: 1.2, y:1.2}, 500, Phaser.Easing.Back.Out, true, 0);
						protoGame.Game.game.add.tween(protoGame.Game.playingLevel.menuAttack[protoGame.Game.playingLevel.selectedPlayer]).to({alpha:1}, 500, Phaser.Easing.Linear.None, true, 0);

						protoGame.Game.game.add.tween(protoGame.Game.playingLevel.menuDefence[protoGame.Game.playingLevel.selectedPlayer].scale).to({x: .8, y:.8}, 500, Phaser.Easing.Back.Out, true, 0);
						protoGame.Game.game.add.tween(protoGame.Game.playingLevel.menuDefence[protoGame.Game.playingLevel.selectedPlayer]).to({alpha:.5}, 500, Phaser.Easing.Linear.None, true, 0);
						break;

					}

				break;	




				case 1: //player 1



				break;


			}



			
			protoGame.Game.playingLevel.players[protoGame.Game.playingLevel.selectedPlayer].level=_selected.action;
			//console.log(protoGame.Game.playingLevel.players[protoGame.Game.playingLevel.selectedPlayer].level);
		
			};


	Player.prototype.submitAction = function(){
			
			
			if(protoGame.Game.playingLevel.players[protoGame.Game.playingLevel.selectedPlayer].submitted==false){
				
				protoGame.Game.playingLevel.players[protoGame.Game.playingLevel.selectedPlayer].submitted=true;
				this.outGroupMenuPlayer(protoGame.Game.playingLevel.selectedPlayer);
				protoGame.Game.playingLevel.playerToggle=false;
				protoGame.Game.weapons.init();

			}
			
			};



	Player.prototype.saySome = function(_text){

		
		if(this.isSaying && _text==undefined) return;

		this.isSaying=true;

		var _this=this;

		var _nuv=this.nuv;

		//user click
		if(_text==undefined){ 

			_text=_this.sayWhat(this.index); 
			//console.log(_text);
			_nuv.say.text=_text;

			protoGame.Game.game.add.tween(_nuv).to({alpha:.9}, 300, Phaser.Easing.Linear.None, true, 0).onComplete.add(function(){
				
				protoGame.Game.game.add.tween(_nuv).to({alpha:0}, 300, Phaser.Easing.Linear.None, true, 3000).onComplete.add(function(){

					_this.isSaying=false;
						
						});
			
					});

		}else{
			//console.log(_text);
			_nuv.say.text=_text;
			protoGame.Game.game.tweens.removeFrom(_nuv);
			_nuv.alpha=1;
			protoGame.Game.game.add.tween(_nuv).to({alpha:0}, 300, Phaser.Easing.Linear.None, true, 3000).onComplete.add(function(){

				_this.isSaying=false;				

					});




		}
		
		

		

	};

	
	Player.prototype.sayWhat=function(who,input){



		switch (protoGame.Game.mainMenu.introStatus){

		case "beforeStart":


			if(who==0){

				return "Ciao, I'm Daniel."

			}else{

				return "Ciao, I'm Noemi."
			}
			

		break;

		case "beforeOrbiting":

			return "What?!?...";
			
		break;

		case "running":

		
			return "RUN! RUN!! RUN!!!...";


		break;

		case "orbiting":

			return "AHHHHHHHHH!!!!";

		break;

		case "newWorld":


		break;

		case "landed":

			var _arr=["Let's look around!!","A strange World!!","I'm scared!","Find a way..."]
			return _arr[protoGame.Game.game.rnd.integerInRange(0, 3)];

		break;

		case "end":

			var _arr=["Let's start!","It's time to begin!","I'am ready!"]
			return _arr[protoGame.Game.game.rnd.integerInRange(0, 3)];

		break;

		}


	};	
	
	