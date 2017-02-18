// JavaScript Document
var protoGame = protoGame || {};

protoGame.Game.weapons.dice={
		
		currentDices:2,
		counter:0,
		bonus:1,
		serie:[],
		
		init:function(){
					groupDice.removeAll();
					groupDice.alpha=1;
					groupDiceBonus.removeAll();
					this.bonus=1;
					this.counter=0;
					this.serie=[];
					groupDice.x=(protoGame.Game.playingLevel.mapStep*800);
					
					for (var _a=0; _a<this.currentDices; _a++){

						new Dice((90*_a)+170,250,_a);
						
					}
			
			},
		
		endTurn:function(){
			
			groupDice.removeAll();
			//protoGame.Game.playingLevel.playerTurn[protoGame.Game.playingLevel.selectedPlayer].level=2;
			protoGame.Game.playingLevel.players[protoGame.Game.playingLevel.selectedPlayer].action=true;
			//protoGame.Game.action.playerAction();


			protoGame.Game.action.startPlayerAction();
			}	
			
		
	
	}


Dice = function (x,y,_a) {

			Phaser.Sprite.call(this, protoGame.Game.game, x, y, "dices");
			this.events.onInputDown.add(this.tapDice, this);
			this.anchor.set(.5);
			this.scale.set(.7);
			this.inputEnabled=true;
			this.alpha=0;

			var color=11;
			this.animations.add('shuffle', Phaser.ArrayUtils.shuffle([0+color,1+color,2+color,3+color,4+color,5+color,6+color,7+color,8+color,9+color,0+color,1+color,2+color,3+color,4+color,5+color,6+color,7+color,8+color,9+color]), 15, true);
			this.play('shuffle');
			protoGame.Game.game.add.tween(this).to( {alpha:1}, 500, Phaser.Easing.Linear.None, true, 100*_a);
			protoGame.Game.game.add.tween(this).to( {y:this.y+(protoGame.Game.game.rnd.integerInRange(-10, +10)),angle:protoGame.Game.game.rnd.integerInRange(1, 20),width:this.width+protoGame.Game.game.rnd.integerInRange(1, 10),height:this.height+protoGame.Game.game.rnd.integerInRange(1, 10)}, 1000, Phaser.Easing.Quadratic.InOut, true, 200*_a, -1, true);

			groupDice.add(this);

			this.effect=new DiceEffect(this.x,this.y);


};

Dice.prototype = Object.create(Phaser.Sprite.prototype);
Dice.prototype.constructor = Dice;
Dice.prototype.update = function() {   };
Dice.prototype.killed = function() { console.log("killed bonus"); this.destroy(); }

Dice.prototype.tapDice = function(_dice) { 

			_dice.inputEnabled=false;
			var isBonus=false;
			var _bonus=0;
			var dice = protoGame.Game.game.rnd.integerInRange(1, 6);

			//dice=100;

			protoGame.Game.weapons.dice.serie.push(dice);

			//check for serie bonus
			if (protoGame.Game.weapons.dice.serie.length>1){

				if(dice == protoGame.Game.weapons.dice.serie[protoGame.Game.weapons.dice.serie.length-2]) { 

						protoGame.Game.weapons.dice.bonus++; 
						//console.log("got x "+ this.bonus);
						_bonus=dice*protoGame.Game.weapons.dice.bonus;
						isBonus=true;

			}
			}
			
			protoGame.Game.weapons.totalScore=protoGame.Game.weapons.totalScore + dice + _bonus;
			protoGame.Game.game.add.tween(_dice).to( {alpha:0}, 200, Phaser.Easing.Linear.None, true).onComplete.add(function(_dice){ _dice.kill(); _dice.destroy(); }, this);

			//_dice.effect.kill();
			protoGame.Game.game.add.tween(_dice.effect).to( {alpha:0}, 200, Phaser.Easing.Linear.None, true).onComplete.add(function(_effect){ _effect.kill(); }, _dice.effect);

			var _style={fill: '#ffffff', fontSize: 40, stroke:'#ff0000', strokeThickness:10};
			_diceBonus = protoGame.Game.game.add.text(_dice.x, _dice.y, ""+dice, _style);
			_diceBonus.font = 'Press Start 2P';
			_diceBonus.anchor.set(.5);
			

			groupDice.add(_diceBonus);

			if(isBonus){
				_xBonus = protoGame.Game.game.add.text(_dice.x, _dice.y+20, "x"+protoGame.Game.weapons.dice.bonus, _style);
				_xBonus.font = 'Press Start 2P';
				_xBonus.anchor.set(.5);
				_xBonus.alpha=1;
				groupDice.add(_xBonus);
				protoGame.Game.game.add.tween(_xBonus).to( {y:_diceBonus.y+60,alpha:0}, 500, Phaser.Easing.Quadratic.InOut, true, 200).onComplete.add(function(_text){ _text.kill(); }, this);
				//_tween3.onStart.add(function(_sprite){  _sprite.alpha=1 },this);
			}


			protoGame.Game.game.add.tween(_diceBonus).to( {y:_diceBonus.y-40,alpha:0}, 500, Phaser.Easing.Quadratic.InOut, true, 0).onComplete.add(function(_text){ _text.kill(); 
					protoGame.Game.weapons.dice.counter++;

					if(protoGame.Game.weapons.dice.counter>protoGame.Game.weapons.dice.currentDices-1){ protoGame.Game.weapons.dice.endTurn();}

			}, this);

}

	
	