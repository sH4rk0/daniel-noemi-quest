// JavaScript Document
var protoGame = protoGame || {};

protoGame.Preload=function(game){}
protoGame.Preload.prototype={
	preload:function(){
		
	
		this.game.load.onLoadStart.add(function(){}, this);
    	this.game.load.onFileComplete.add(this.fileComplete, this);
		
   		this.game.load.onLoadComplete.add(function(){
	   
	 		protoGame.Preload.loadingBar.visible=false;
			protoGame.Preload.loadingPerc.visible=false;
			protoGame.Preload.startBtn.visible=true;
			
		}, this);
	   
	   protoGame.Preload.loadingContainer=this.add.sprite(0,0,this.game.cache.getBitmapData('loadingContainer'));
	   
	   	//start button
		//--------------------------
	   		protoGame.Preload.startBtn=this.add.sprite(0,0,this.game.cache.getBitmapData('startBtn'));
			protoGame.Preload.startBtn.anchor.setTo(0);
	   			
	   			_spriteText=this.game.add.text(protoGame.Preload.startBtn.width/2,protoGame.Preload.startBtn.height/2, 'START', { fill: '#ffffff'});
			   
			   _spriteText.anchor.set(0.5);
			   protoGame.Preload.startBtn.addChild(_spriteText);
			   
	   		   protoGame.Preload.startBtn.inputEnabled = true;
			   protoGame.Preload.startBtn.events.onInputDown.add(function(){this.game.state.start('Game'); }, this);
			   protoGame.Preload.startBtn.visible=false;
			   protoGame.Preload.loadingContainer.addChild(protoGame.Preload.startBtn);
	   
	   //Loading container
	   //--------------------------
	    
		
		protoGame.Preload.loadingBar=this.add.sprite(0,0,this.game.cache.getBitmapData('loadingBar'));
		protoGame.Preload.loadingBar.anchor.setTo(0);
		protoGame.Preload.loadingBarSize={width:protoGame.Preload.loadingBar.width,height:protoGame.Preload.loadingBar.height};
		
		protoGame.Preload.loadingPerc = this.game.add.text(protoGame.Preload.loadingBarSize.width/2,protoGame.Preload.loadingBarSize.height/2, '0%', { fill: '#ffffff',stroke:'#0096ff',strokeThickness:5 });
		protoGame.Preload.loadingBar.addChild(protoGame.Preload.loadingPerc);
		protoGame.Preload.loadingPerc.anchor.set(0.5);
		
		protoGame.Preload.loadingContainer.addChild(protoGame.Preload.loadingBar);
		this.load.setPreloadSprite(protoGame.Preload.loadingBar);
		
		//Assets Load
	  	//--------------------------	
	   	// IMAGES		
		for (var i=0; i<gameData.assets.images.length; i++){ this.game.load.image(gameData.assets.images[i].name, gameData.assets.images[i].path); }	
		
		// SPRITESHEETS		
		for (var i=0; i<gameData.assets.spritesheets.length; i++){ 
		this.game.load.spritesheet(gameData.assets.spritesheets[i].name, gameData.assets.spritesheets[i].path, gameData.assets.spritesheets[i].width, gameData.assets.spritesheets[i].height, gameData.assets.spritesheets[i].frames); 
		}
		
		//bitmap fonts
		for (var i=0; i<gameData.assets.bitmapfont.length; i++){ 
		this.game.load.bitmapFont(gameData.assets.bitmapfont[i].name, gameData.assets.bitmapfont[i].imgpath, gameData.assets.bitmapfont[i].xmlpath);
		}

		// SOUNDS		
		for (var i=0; i<gameData.assets.sounds.length; i++){ 
			this.game.load.audio(gameData.assets.sounds[i].name, gameData.assets.sounds[i].paths);
		}				
		


		
 		this.game.load.script('webfont', 'http://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

 		
        	this.game.load.atlas("TEST", "assets/anim/Atlas.png","assets/anim/Atlas.json");
            this.game.load.xml("TESTXml", "assets/anim/TEST.xml");
            this.game.load.json("TESTJson", "assets/anim/TEST.json");


		this.position();
			
		},
		
	fileComplete:function(progress, cacheKey, success, totalLoaded, totalFiles){ protoGame.Preload.loadingPerc.text=progress+"%";},
	
	position:function(){ 
		
		var _x=parseInt((protoGame.Preload.loadingContainer.width/2)-(protoGame.Preload.loadingBarSize.width/2));
		var _y=parseInt((protoGame.Preload.loadingContainer.height/2)-(protoGame.Preload.loadingBarSize.height/2));
		protoGame.Preload.loadingBar.x=_x;
		protoGame.Preload.loadingBar.y=_y;
		
		_x=parseInt((protoGame.Preload.loadingContainer.width/2)-(protoGame.Preload.startBtn.width/2));
		_y=parseInt((protoGame.Preload.loadingContainer.height/2)-(protoGame.Preload.startBtn.height/2));
		protoGame.Preload.startBtn.x=_x;
		protoGame.Preload.startBtn.y=_y;
		
	}
	
	
	
	}


