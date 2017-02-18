// JavaScript Document
var protoGame = protoGame || {};

protoGame.Game.settings={
	
		players:[

		{name:"Daniel", weapon: protoGame.Game.weapons.weaponTypeDiceMath,
			anim:[
					{anim:"idle",frames:[60,61,62,63,64,65,66,67],speed:6,loop:true},
					{anim:"idleIntro",frames:[27],speed:1,loop:false},
					{anim:"walk",frames:[28,27,28,29],speed:4,loop:true},
					{anim:"walkDressed",frames:[24,25,26,25],speed:4,loop:true},
					{anim:"down",frames:[88],speed:0,loop:false},
					{anim:"attack",frames:[48,49,50],speed:10,loop:false},
					{anim:"attack2",frames:[51,52,53,54,55,56],speed:10,loop:false},
					{anim:"hit",frames:[15],speed:0,loop:false},
					{anim:"front",frames:[4],speed:0,loop:false},
					{anim:"orbit",frames:[4],speed:0,loop:false},
					{anim:"walkback",frames:[15,16,17,16],speed:6,loop:true},
					{anim:"idleWorld",frames:[4,4,4,4,8,4,4,4,4,4,4,8,4,4,4,4,4,8,4,4,4,4,4,8,4,4,4,4,4,8,4,4,4,4,7,7,7,4,4,4,4,4,4,8,4,4,4,4,4,8,4,4,4,6,6,6,4,4,8,4,8,4,4,4,4],speed:3,loop:true},
					{anim:"idleWorldDressed",frames:[1,1,1,1,1,1,20,1,1,1,1,1,20,1,1,1,1,19,19,19,1,1,1,1,1,1,20,1,1,1,1,1,20,1,1,1,1,1,20,1,20,1,1,1,1,1,1,20,1,1,1,1,1,18,18,18],speed:3,loop:true}

				]
		},
		{name:"Noemi", weapon: protoGame.Game.weapons.weaponTypeDice,
			anim:[
					{anim:"idle",frames:[60,61,62,63,64,65,66,67],speed:6,loop:true},
					{anim:"idleIntro",frames:[27],speed:1,loop:false},
					{anim:"walk",frames:[28,27,28,29],speed:4,loop:true},
					{anim:"walkDressed",frames:[24,25,26,25],speed:4,loop:true},
					{anim:"down",frames:[88],speed:0,loop:false},
					{anim:"attack",frames:[48,49,50,51,52,53,54,55],speed:5,loop:true},
					{anim:"hit",frames:[15],speed:0,loop:false},
					{anim:"front",frames:[4],speed:0,loop:false},
					{anim:"orbit",frames:[4],speed:0,loop:false},
					{anim:"walkback",frames:[15,16,17,16],speed:6,loop:true},
					{anim:"idleWorld",frames:[4,4,4,8,4,4,4,4,4,6,6,6,4,4,4,4,4,4,8,4,4,4,4,4,8,4,4,4,4,7,7,7,4,4,4,4,4,4,8,4,4,4,4,4,8,4,4,4,4,4,8,4,8,4,4,4,4],speed:3,loop:true},
					{anim:"idleWorldDressed",frames:[1,1,1,20,1,1,1,1,1,18,18,18,1,1,1,1,1,1,20,1,1,1,1,1,20,1,1,1,1,19,19,19,1,1,1,1,1,1,20,1,1,1,1,1,20,1,1,1,1,1,20,1,20,1,1,1,1],speed:3,loop:true}

				]
		}
		],
		
		getPlayerName:function(_index){ return this.players[_index].name; },
		getPlayerAnimations:function(_index){ return this.players[_index].anim; }
	
	}
	
	
	