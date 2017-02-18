// JavaScript Document
var protoGame = protoGame || {};

protoGame.Game.weapons.diceMath={
		
		currentDices:2,
		bonus:1,
		serie:[],
		serieDice:[],
		
		init:function(){

					groupDice.removeAll();
					groupDice.alpha=1;
					groupDiceBonus.removeAll();
					this.bonus=1;
					this.serie=[];
					this.serieDice=[];

					
					for (var _a=0; _a<this.currentDices; _a++){

						new DiceMath((110*_a)+170,250,_a);
						
					}

					
			
			},
		
		endTurn:function(){
			
			groupDice.removeAll();
			groupDiceBonus.removeAll();
			protoGame.Game.playingLevel.players[protoGame.Game.playingLevel.selectedPlayer].action=true;
			protoGame.Game.action.startPlayerAction();

			}	
			
		
	
	}


DiceMath = function (x,y,_a,_value,_correct) {

			Phaser.Sprite.call(this, protoGame.Game.game, x, y, "dices");
			if(_value==undefined)
				{
					
					this.events.onInputDown.add(this.tapDice, this);
				}
			else
				{

					this.events.onInputDown.add(this.tapScore, this);
					this.value=_value;
					this.correct=_correct;
				}

			this.anchor.set(.5);
			this.scale.set(.7);
			this.inputEnabled=true;
			this.alpha=0;
			this.animations.add('shuffled', Phaser.ArrayUtils.shuffle([0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9]), 15, true);
			this.play('shuffled');
			protoGame.Game.game.add.tween(this).to( {alpha:1}, 500, Phaser.Easing.Linear.None, true, 100*_a);
			protoGame.Game.game.add.tween(this).to( {width:this.width+protoGame.Game.game.rnd.integerInRange(1, 10),height:this.height+protoGame.Game.game.rnd.integerInRange(1, 10)}, 1000, Phaser.Easing.Quadratic.InOut, true, 200*_a, -1, true);

			groupDice.add(this);

			if(_value!=undefined){

				_plus = new Equation(this.x, this.y, _value);
				_plus.alpha=0;
				_plus.correct=false;
				if(_correct) _plus.correct=true;
				protoGame.Game.game.add.tween(_plus).to( {alpha:1}, 500, Phaser.Easing.Linear.None, true, 0);
			
			}


			this.effect =	new DiceEffect(this.x,this.y);
			
			

};

DiceMath.prototype = Object.create(Phaser.Sprite.prototype);
DiceMath.prototype.constructor = DiceMath;
DiceMath.prototype.update = function() {  
		this.angle+=1;  
		this.effect.x=this.x;
		this.effect.y=this.y;
};
DiceMath.prototype.killed = function() {  this.destroy(); }


DiceMath.prototype.tapScore = function(_dice) { 

		//console.log(this.correct);
		this.inputEnabled=false;
		var _total=0;
		var _result="";
		var _color="#ff0000";
		var _correct=this.correct;
		for(var _v=0; _v<protoGame.Game.weapons.diceMath.serie.length; _v++){

			_total+=protoGame.Game.weapons.diceMath.serie[_v];

		}
		_total=_total*protoGame.Game.weapons.diceMath.bonus;

		var _trueValue,_falseValue;
		groupDiceBonus.forEach(function(_sprite){

				if(_sprite.correct && _sprite.correct!=null){_trueValue=_sprite;}
				if(!_sprite.correct && _sprite.correct!=null){_falseValue=_sprite;}

		}, this);


		protoGame.Game.game.add.tween(groupDice).to( {alpha:0}, 500, Phaser.Easing.Linear.None, true, 0);


		if(_correct){
				protoGame.Game.game.add.tween(_falseValue).to( {alpha:0}, 500, Phaser.Easing.Linear.None, true, 0);
				protoGame.Game.game.add.tween(_trueValue).to( {y:250}, 500, Phaser.Easing.Quadratic.InOut, true, 0);
				_total=_total*2; 
				_result="CORRECT!!!";
				_color="#00cc00";


			}else{
				protoGame.Game.game.add.tween(_trueValue).to( {alpha:0}, 500, Phaser.Easing.Linear.None, true, 0);
				protoGame.Game.game.add.tween(_falseValue).to( {y:250}, 500, Phaser.Easing.Quadratic.InOut, true, 0);
				parseInt(_total=_total/2);
				_result="WRONG!!!";
				_color="#ff0000";

			}
		
		protoGame.Game.weapons.totalScore=_total;


			var _style={fill: '#ffffff', fontSize: 40, stroke:_color, strokeThickness:10};
			_text = protoGame.Game.game.add.text(0, 300,  _result, _style);
			_text.font = 'Press Start 2P';
			_text.anchor.set(.5);
			_text.alpha=0;
			groupLevelMessages.add(_text);

			//enter Enemies turn 
			protoGame.Game.game.add.tween(_text).to( {x:400,alpha:1}, 500, Phaser.Easing.Quadratic.InOut, true, 500)
			.onComplete.add(function(_text){ 

				var _bonus;
				if(_correct){

					var _index=0;
					groupDiceBonus.forEach(function(_sprite){

					protoGame.Game.game.add.tween(_sprite).to( {y:_sprite.y-50,alpha:0}, 500, Phaser.Easing.Quadratic.InOut, true, 100*_index);
					_index++;

					}, this);

					_bonus="Score Doubled!";

				}else{

					groupDiceBonus.forEach(function(_sprite){ _sprite.explode(); }, this);
					_bonus="Score Halved!";

				}


				var _style={fill: '#ffffff', fontSize: 40, stroke:_color, strokeThickness:10};
				var _xBonus = protoGame.Game.game.add.text(400, 350, _bonus, _style);
				_xBonus.font = 'Press Start 2P';
				_xBonus.anchor.set(.5);
				_xBonus.alpha=0;
				groupDiceBonus.add(_xBonus);
				protoGame.Game.game.add.tween(_xBonus).to( {alpha:1}, 500, Phaser.Easing.Quadratic.InOut, true, 0).onComplete.add(function(_text){ 

						protoGame.Game.game.add.tween(_xBonus).to( {y:400,alpha:0}, 500, Phaser.Easing.Quadratic.InOut, true, 500).onComplete.add(function(_text){ _text.kill(); }, this);

					 }, _xBonus);
				

					//exit Enemies turn 
			protoGame.Game.game.add.tween(_text).to( {x:800,alpha:0}, 500, Phaser.Easing.Quadratic.InOut, true, 1000)
					.onComplete.add(function(_text){ 

							_text.kill(); 
							//start enemy action
							protoGame.Game.weapons.diceMath.endTurn();

			     			
					}, this);


			}, this);

	

};




DiceMath.prototype.tapDice = function(_dice) { 

			_dice.inputEnabled=false;
			var isBonus=false;
			var _bonus=0;
			var dice = protoGame.Game.game.rnd.integerInRange(1, 5);

			protoGame.Game.weapons.diceMath.serie.push(dice);
			

			//check for serie bonus
			if (protoGame.Game.weapons.diceMath.serie.length>1){

				if(dice == protoGame.Game.weapons.diceMath.serie[protoGame.Game.weapons.diceMath.serie.length-2]) { 

						protoGame.Game.weapons.diceMath.bonus++; 
						//console.log("got x "+ this.bonus);
						_bonus=dice*protoGame.Game.weapons.diceMath.bonus;
						isBonus=true;

			}
			}
	

			protoGame.Game.game.add.tween(_dice).to( {alpha:0}, 200, Phaser.Easing.Linear.None, true).onComplete.add(function(_dice){ _dice.kill(); _dice.destroy(); }, this);

			protoGame.Game.weapons.diceMath.serieDice.push(new Equation(_dice.x, _dice.y, ""+dice));

			if(isBonus){
				var _style={fill: '#ffffff', fontSize: 40, stroke:'#ff0000', strokeThickness:10};
				var _xBonus = protoGame.Game.game.add.text(_dice.x, _dice.y+20, "x"+protoGame.Game.weapons.diceMath.bonus, _style);
				_xBonus.font = 'Press Start 2P';
				_xBonus.anchor.set(.5);
				_xBonus.alpha=1;
				groupDiceBonus.add(_xBonus);
				protoGame.Game.game.add.tween(_xBonus).to( {y:_xBonus.y-60,alpha:0}, 500, Phaser.Easing.Quadratic.InOut, true, 200).onComplete.add(function(_text){ _text.kill(); }, this);
				
			}

			//console.log(protoGame.Game.weapons.diceMath.serie.length,protoGame.Game.weapons.diceMath.currentDices)
			if (protoGame.Game.weapons.diceMath.serie.length==protoGame.Game.weapons.diceMath.currentDices){

				this.showOperators();
				
			}



};

DiceMath.prototype.showOperators = function() {  

		
	var _operatorRnd=protoGame.Game.game.rnd.integerInRange(0, 2);
	var _operator,_val1,_val2,_dice1,_dice2,_trueValue,_wrongValue,_correct1,_correct2;
	var _diceRnd=protoGame.Game.game.rnd.integerInRange(0, 1);
	var _diceRnd2=protoGame.Game.game.rnd.integerInRange(0, 1);

			_val1=protoGame.Game.weapons.diceMath.serie[0];
			_val2=protoGame.Game.weapons.diceMath.serie[1];

	if(_operatorRnd==2 && (_val1==_val2)){_operatorRnd=0;}

	


	switch(_operatorRnd){

		case 0: //add

			_operator="+";
			
			_trueValue=_val1+_val2;
			
			if (_diceRnd==0){_wrongValue = (_val1+_val2)+protoGame.Game.game.rnd.integerInRange(1, 2); }else{ _wrongValue = (_val1+_val2)+protoGame.Game.game.rnd.integerInRange(-1, -2);}
			if (_diceRnd2==0){ _dice1=_trueValue; _correct1=true; _dice2=_wrongValue; _correct2=false; } else { _dice2=_trueValue; _correct2=true; _dice1=_wrongValue;  _correct1=false; }

		break;

		case 1: //sub

			_operator="-";

			if (_val1>=_val2){

				_trueValue=_val1-_val2;	
				if (_diceRnd==0){_wrongValue = (_val1-_val2)+protoGame.Game.game.rnd.integerInRange(1, 2); }else{ _wrongValue = (_val1-_val2)+protoGame.Game.game.rnd.integerInRange(-1, -2);}
				if (_diceRnd2==0){ _dice1=_trueValue; _correct1=true; _dice2=_wrongValue; _correct2=false; } else { _dice2=_trueValue; _correct2=true; _dice1=_wrongValue;  _correct1=false; }


			}else {

				_trueValue=_val2-_val1;		
				if (_diceRnd==0){_wrongValue = (_val2-_val1)+protoGame.Game.game.rnd.integerInRange(1, 2); }else{ _wrongValue = (_val2-_val1)+protoGame.Game.game.rnd.integerInRange(-1, -2);}
				if (_diceRnd2==0){ _dice1=_trueValue; _correct1=true; _dice2=_wrongValue; _correct2=false; } else { _dice2=_trueValue; _correct2=true; _dice1=_wrongValue;  _correct1=false; }

				protoGame.Game.game.add.tween(protoGame.Game.weapons.diceMath.serieDice[0]).to( {x:protoGame.Game.weapons.diceMath.serieDice[1].x}, 500, Phaser.Easing.Quadratic.InOut, true, 0);
				protoGame.Game.game.add.tween(protoGame.Game.weapons.diceMath.serieDice[1]).to( {x:protoGame.Game.weapons.diceMath.serieDice[0].x}, 500, Phaser.Easing.Quadratic.InOut, true, 0);

			}	

		break;

		case 2:
			
		if (_diceRnd==0){
			_operator="<";
			if(_val1<_val2){_wrongValue="False"; _trueValue="True";}else{_wrongValue="True"; _trueValue="False";}

		}else{
			_operator=">";
			if(_val1>_val2){_wrongValue="False"; _trueValue="True";}else{_wrongValue="True"; _trueValue="False";}

		}

			if (_diceRnd2==0) { _dice1=_trueValue; _correct1=true; _dice2=_wrongValue; _correct2=false; }
						 else { _dice2=_trueValue; _correct2=true; _dice1=_wrongValue;  _correct1=false; }

		
		break;




	}

	
	var _op = new Equation(225, 200, _operator);
	protoGame.Game.game.add.tween(_op).to( {y:250,alpha:1}, 500, Phaser.Easing.Quadratic.InOut, true, 0);

if(_operatorRnd<2){
	var _op2 = new Equation(335, 200, "=");
	protoGame.Game.game.add.tween(_op2).to( {y:250,alpha:1}, 500, Phaser.Easing.Quadratic.InOut, true, 0);
}
	


	new DiceMath((110*2)+170,200,2,_dice1,_correct1);

	new DiceMath((110*2)+170,300,2,_dice2,_correct2);
		

  };





Equation = function (_x,_y,_value) {

			var _style;
			if(isNaN(_value)){
				_style={fill: '#ffffff', fontSize: 30, stroke:'#ff0000', strokeThickness:10};

			}else{

				_style={fill: '#ffffff', fontSize: 40, stroke:'#ff0000', strokeThickness:10};
			}
			
			Phaser.Text.call(this, protoGame.Game.game, _x, _y, _value, _style);
			this.font = 'Press Start 2P';
			this.anchor.set(.5);
			this.exploded=false;
			groupDiceBonus.add(this);
			this.correct=null;
};

Equation.prototype = Object.create(Phaser.Text.prototype);
Equation.prototype.constructor = Equation;
Equation.prototype.update = function() { 

	if(this.exploded){

		this.angle+=.5;
		if (this.y>600+this.height){

			this.kill();
			this.destroy();
			
		}
	}
 };

Equation.prototype.explode = function() { 

	this.exploded=true;
	protoGame.Game.game.physics.enable(this);
	this.body.velocity.y = protoGame.Game.game.rnd.integerInRange(-400, -700);
    this.body.velocity.x = protoGame.Game.game.rnd.integerInRange(-100, 100);
    this.body.acceleration.y = 1000;


				 };

Equation.prototype.killed = function() {  };






DiceEffect = function (_x,_y) {

			Phaser.Sprite.call(this, protoGame.Game.game, _x, _y, "introEffect");
			
			groupDice.add(this);
			this.sendToBack();
			this.anchor.set(.5);
			this.scale.set(.6);
			protoGame.Game.game.add.tween(this.scale).to({ x: 0.5, y: .5}, 3500, Phaser.Easing.Quadratic.InOut, true, 0,-1,true);
			this.angleMove=.5;//protoGame.Game.game.rnd.integerInRange(.5, .6);
};

DiceEffect.prototype = Object.create(Phaser.Text.prototype);
DiceEffect.prototype.constructor = DiceEffect;
DiceEffect.prototype.update = function() { 

		this.angle+=this.angleMove;
		
 };






	
	


	
	