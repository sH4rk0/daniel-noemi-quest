var protoGame = protoGame || {};

protoGame.Game.fade={
	
	/*
	 00 01 02 03 04 05 06 07 
	 08 09 10 11 12 13 14 15 
	 16 17 18 19 20 21 22 23 
	 24 25 26 27 28 29 30 31 
	 32 33 34 35 36 37 38 39 
	 40 41 42 43 44 45 46 47
	*/
	
	sequences:{

		linear: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47],
		diagonal:[0,1,8,2,9,16,3,10,17,24,4,11,18,25,32,5,12,19,26,33,40,6,13,20,27,34,41,7,14,21,28,35,42,15,22,29,36,43,23,30,37,44,31,38,45,39,46,47],
		fromLeft:[0,8,16,24,32,40,41,33,25,17,9,1,2,10,18,26,34,42,43,35,27,19,11,3,4,12,20,28,36,44,45,37,29,21,13,5,6,14,22,30,38,46,47,39,31,23,15,7],
		circular:[27,28,20,19,18,26,34,35,36,37,29,21,13,12,11,10,9,17,25,33,41,42,43,44,45,46,38,30,22,14,6,5,4,3,2,1,0,8,16,24,32,40,47,39,31,23,15,7],
		square:[40,47,7,0,41,32,46,39,6,15,1,8,42,33,24,45,38,31,5,14,23,2,9,16,43,34,25,44,37,30,4,13,22,3,10,17,35,26,36,29,12,21,11,18,27,28,20,19],
		tron:[40,41,42,43,44,45,46,47,39,31,23,15,7,6,5,4,3,2,1,0,8,16,24,32,33,34,35,36,37,38,30,22,14,13,12,11,10,9,17,25,26,27,28,29,21,20,19,18]


	},

	sequenceArr:["linear","diagonal","fromLeft","circular","square","tron"],

	init:function(){ 
	
	

		for (var _i=0; _i<48; _i++){


			_x=parseInt(_i % 8);
			_y=parseInt(_i / 8);

				_sprite=protoGame.Game.game.add.sprite(_x*100,_y*100, protoGame.Game.game.cache.getBitmapData('fade'));
				_sprite.alpha=0;
				_sprite.name="fade"+ _i;
				groupFade.add(_sprite);

		}
		groupFade.visible=false;

	},

	show:function(_callback,_sequence){
			groupFade.visible=true;
		 var __sequence=this.getSequence(_sequence);

		  //console.log(__sequence)
		groupFade.fixedToCamera=true;

		for (var _i=0; _i<48; _i++){

		_sprite=groupFade.getAt(__sequence[_i]);
		_sprite.currIndex=_i;
		protoGame.Game.game.add.tween(_sprite).to({alpha:1}, 400, Phaser.Easing.Linear.None, true,_i*10).onComplete.add(function(sprite){

			//console.log(sprite.currIndex)
				if(sprite.currIndex==47){if(typeof(_callback)==="function"){ _callback(); }; protoGame.Game.fade.hide(_sequence);}
},this);

		

	}

	},
	
	hide:function(_sequence){
		
 var __sequence=this.getSequence(_sequence);



for (var _i=0; _i<48; _i++){

		_sprite=groupFade.getAt(__sequence[_i]);
		_sprite.currIndex=_i;
		protoGame.Game.game.add.tween(_sprite).to({alpha:0}, 400, Phaser.Easing.Linear.None, true,_i*10).onComplete.add(function(sprite){

				if(sprite.currIndex==47){ groupFade.visible=false;  }
},this);

		

	}

	},

	getSequence:function(_sequence)	{


		if(_sequence!=undefined){

			return this.sequences[_sequence];

		}else{


			return this.sequences[this.sequenceArr[protoGame.Game.game.rnd.integerInRange(0, this.sequenceArr.length-1)]];
		}


	}
	
		
		
		
	
	}
	
	