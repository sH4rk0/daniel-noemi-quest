// JavaScript Document
var protoGame = protoGame || {};

protoGame.Game.map={
	
	route:0,
	level:0,

	routes:[],

	routesObj:undefined,
	

	init:function(){

		this.routesObj=gameData.map.routes.slice(0);
		
		groupMapRoutes = protoGame.Game.game.add.group();
		groupMapLevels = protoGame.Game.game.add.group();

		var _map =  protoGame.Game.game.add.sprite(0,0,"map");

		groupMap.add(_map);
		
		var _route;
		for (var i=0; i<this.routesObj.length; i++){

		_route=protoGame.Game.game.add.sprite(this.routesObj[i].position.x,this.routesObj[i].position.y,this.routesObj[i].sprite);
		_route.inputEnabled=true;
		_route.alpha=0.7;
		_route.index=i;
		_route.route=this.routesObj[i];
		_route.name=this.routesObj[i].name;
		_route.events.onInputDown.add(this.displayRouteLevels, this);
		_route.events.onInputOver.add(this.routeOver, this);
		_route.events.onInputOut.add(this.routeOut, this);
		
		groupMapRoutes.add(_route);

		}

		groupMap.add(groupMapRoutes);
		groupMap.add(groupMapLevels);


		this.mainBtn=protoGame.Game.game.add.sprite(660,60, "btn1");
		this.mainBtn.inputEnabled=true;
		this.mainBtn.events.onInputDown.add(this.toMain, this);
		this.mainBtn.anchor.set(.5);
		var _style={font: 'normal 18px', fill: '#ffffff', stroke:'#583a20', strokeThickness:5};
		var _skiptext = protoGame.Game.game.add.text(0, 0, 'Back', _style);
		_skiptext.font='Press Start 2P';
		_skiptext.anchor.set(.5,.3);
		this.mainBtn.addChild(_skiptext);
		groupMap.add(this.mainBtn);


	},

	toMain:function(){

		protoGame.Game.map.mainBtn.inputEnabled=false;
		protoGame.Game.fade.show(function(){protoGame.Game.map.hide(); protoGame.Game.mainMenu.showMainScreen(); });


	},

	display:function(){
		console.log("display");
		this.mainBtn.inputEnabled=true;
		protoGame.Game.gameState=protoGame.Game.gameStateMap;
		groupMap.visible=true;
		protoGame.Game.setCamera(0,0);
		this.hideRouteLevels();

	},

	hide:function(){
		groupMap.visible=false;
		this.hideRouteLevels();

	},

	routeOver:function(_route){

		_route.alpha=1;

	},

	routeOut:function(_route){

		_route.alpha=0.7;

	},

	hideRouteLevels:function(){

		groupMapLevels.visible=false;

	},

	displayRouteLevels:function(_route){

		groupMapRoutes.setAll("alpha", .7);
		_route.alpha=1;

		groupMapLevels.destroy(true,true);
		
		var _level,_x,_y;

		for (var i=0; i<_route.route.levels.length; i++){

			_x=parseInt(i % 3);
			_y=parseInt(i / 3);

			_level=protoGame.Game.game.add.sprite((_x*80)+7, (_y*80)+7,"mapLevels");
			_level.anchor.set(.5);

			if(i<=protoGame.Game.savedObj.routes[_route.index].completed){

				if(!_route.route.levels[i].locked){

				_level.alpha=1;
				_level.inputEnabled=true;
				_level.frame=_route.route.frames[0];
				protoGame.Game.game.add.tween(_level.scale).to({x:.9,y:.9}, 500, Phaser.Easing.Quadratic.Out, true, 100*i , -1,true);


				}else{

				_level.alpha=0.5;
				_level.inputEnabled=false;
				_level.frame=_route.route.frames[1];

				}
				

			} else { 

				_level.alpha=1; _level.inputEnabled=false; _level.frame=_route.route.frames[1];

				if(_route.route.levels[i].locked){_level.alpha=0.5;}

			}

			_level.frame=_route.route.frame;
			
			_level.route=_route.index;
			_level.index=i;
			_level.name=_route.route.levels[i].name;
			_level.events.onInputDown.add(this.selectLevel, this);
			
			groupMapLevels.add(_level);


			

		}

groupMapLevels.x=_route.route.framesPosition[0]-50;
groupMapLevels.y=_route.route.framesPosition[1];
groupMapLevels.visible=true;
groupMapLevels.alpha=0;
groupMapLevels
protoGame.Game.game.add.tween(groupMapLevels).to({alpha:1,x:_route.route.framesPosition[0]}, 1000, Phaser.Easing.Quadratic.Out, true, 0);

	},

	selectLevel:function(_level){


		this.route=_level.route;
		this.level=_level.index;
		//console.log(this.route,this.level);
		
		protoGame.Game.fade.show(function(){ groupMap.visible=false; protoGame.Game.playingLevel.display(); });
		
	
	}
	
	
	
	};

