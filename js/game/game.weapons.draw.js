// JavaScript Document
var protoGame = protoGame || {};

protoGame.Game.weapons.draw={
	
	sequencesArray:[],
	sequenceTimer:undefined,
	currentSequence:0,
	
	sequenceTypes:{lines:0,path:1,spiral:2},
	
	initSequences:function(){
		
		
		this.sequencesArray=[];
		this.sequenceTimer = protoGame.Game.game.time.create(false);
		this.sequenceTimer.start();
		
		this.pushSequences();
		
		
		},
	
	pushSequences:function(){
		
		this.sequencesArray.push({timeout:3000,executed:false,pathIndex:undefined,items:10,index:0,pattern:this.getPattern(this.sequenceTypes.lines)});
		this.sequencesArray.push({timeout:3000,executed:false,pathIndex:undefined,items:10,index:1,pattern:this.getPattern(this.sequenceTypes.lines)});
		this.sequencesArray.push({timeout:3000,executed:false,pathIndex:undefined,items:10,index:2,pattern:this.getPattern(this.sequenceTypes.lines)});
		this.playSequence(0);
		
		},
	
	getPattern:function(){
		
		
		return 0;
		
		},
	
	
	playSequence:function(index){
		 
		this.drawSequence(this.sequencesArray[index]);	
		
		},
		
	
	
	
	drawSequence:function(_seqObj){
		
		
		for(var i=1; i<_seqObj.items; i++){
			 _sprite=protoGame.Game.game.add.sprite(i*30,_seqObj.index*40,protoGame.Game.game.cache.getBitmapData('path'));
			 _sprite.inputEnabled=true;
			 _sprite.pathIndex=i;
			 _sprite.sequenceIndex=_seqObj.index;
			 _sprite.events.onInputOver.add(this.tappedItem, this);
	 
	 		GroupWeapons.add(_sprite);
		
		}
		
		//console.log(this.sequenceTimer);
		
		this.sequenceTimer.add(_seqObj.timeout, this.nextSequence, this);
	 
		},	
	
	tappedItem:function(_sprite){
		 
		
		//console.log(_sprite.pathIndex,this.sequencesArray[_sprite.sequenceIndex].pathIndex) 
		 
		if(this.sequencesArray[_sprite.sequenceIndex].pathIndex==undefined){
			
			this.sequencesArray[_sprite.sequenceIndex].pathIndex=_sprite.pathIndex;
			
			 }else{
		
		
		if(_sprite.pathIndex!=(this.sequencesArray[_sprite.sequenceIndex].pathIndex+1)){ console.log("err")}
		
		this.sequencesArray[_sprite.sequenceIndex].pathIndex++;
		
		
		//console.log(_sprite.sequenceIndex,this.sequencesArray[_sprite.sequenceIndex]);
		
		}
		
		
		_sprite.kill();
		
		},
		
		
		nextSequence:function(){
			
			this.removeSequence();
			this.sequencesArray[this.currentSequence].executed=true;
			if(this.sequencesArray[this.currentSequence+1]!=undefined) {this.currentSequence++; this.playSequence(this.currentSequence);}
			//console.log("next sequence")
			
			},
			
		removeSequence:function(){
			
			GroupWeapons.forEach(function(_child){_child.kill();});	
			
			
			
			}	
		
		
		
		
	
	}
	
	