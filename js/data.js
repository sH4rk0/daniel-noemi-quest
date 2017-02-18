


// JavaScript Document

var gameData={

		
	assets: {
				spritesheets:[
				{name:"Daniel",path:"assets/images/pg/daniel.png", width:100, height: 100, frames:96},
				{name:"Noemi",path:"assets/images/pg/noemi.png", width:100, height: 100, frames:96},
				{name:"sword",path:"assets/images/weapons/sword.png", width:56, height: 70, frames:12},
				{name:"diceRed",path:"assets/images/dices/red.png", width:106, height: 107, frames:6},
				{name:"diceGreen",path:"assets/images/dices/green.png", width:106, height: 107, frames:10},
				{name:"dice",path:"assets/images/dices/dice.png", width:106, height: 107, frames:10},
				{name:"dices",path:"assets/images/dices/dices.png", width:106, height: 107, frames:55},
				{name:"hole",path:"assets/images/intro/hole.png", width:192, height: 192, frames:15},
				{name:"coins",path:"assets/images/bonus/coins.png", width:16, height: 16, frames:30},
				{name:"potions",path:"assets/images/bonus/potions.png", width:25, height: 30, frames:7},
				{name:"foods",path:"assets/images/bonus/foods.png", width:29, height: 30, frames:10},
				{name:"introItems",path:"assets/images/intro/items.png", width:65, height: 65, frames:20},
				{name:"enemyRock",path:"assets/images/enemy/enemyRock.png", width:76, height: 64, frames:48},
				{name:"enemyIce",path:"assets/images/enemy/enemyIce.png", width:76, height: 64, frames:48},
				{name:"spells",path:"assets/images/weapons/spell2.png", width:96, height: 96, frames:30},
				{name:"puf",path:"assets/images/bonus/puf.png", width:16, height: 16, frames:5},
				{name:"chests",path:"assets/images/intro/chests.png", width:32, height: 32, frames:32},
				{name:"introItems2",path:"assets/images/intro/items2.png", width:32, height: 32, frames:3},
				{name:"mapLevels",path:"assets/images/map/levels.png", width:80, height: 80, frames:12},
				{name:"shield0",path:"assets/images/pg/magic_shield_daniel.png", width:192, height: 192, frames:20},
				{name:"shield1",path:"assets/images/pg/magic_shield_noemi.png", width:192, height: 192, frames:20},
				{name:"iceSword",path:"assets/images/weapons/iceSword.png", width:150, height: 150, frames:4},
				{name:"lightingGround",path:"assets/images/weapons/lightningGround.png", width:112, height: 66, frames:5},
				{name:"fireGround",path:"assets/images/weapons/fireGround.png", width:64, height: 64, frames:12},
				{name:"rockGround",path:"assets/images/weapons/rockGround.png", width:279, height: 84, frames:12},

				{name:"lightingSmall",path:"assets/images/weapons/lightningSmall.png", width:46, height: 128, frames:3},
				{name:"fireSmall",path:"assets/images/weapons/fireSmall.png", width:58, height: 28, frames:3},
				{name:"iceSmall",path:"assets/images/weapons/iceSmall.png", width:150, height: 41, frames:3},
				{name:"iceBig",path:"assets/images/weapons/iceBig.png", width:150, height: 150, frames:4},
				{name:"rockBig",path:"assets/images/weapons/rockBig.png", width:100, height: 105, frames:1},
				{name:"rockSmall",path:"assets/images/weapons/rockSmall.png", width:24, height: 28, frames:4},

				{name:"death",path:"assets/images/pg/death.png", width:40, height: 43, frames:7},

				//{name:"daniel2",path:"assets/images/pg/daniel2.png", width:68, height: 100, frames:2}
				],
				
				images:[
				//level tiles
				{name:"levelTiles", path:"assets/images/tiles/levelTiles.png"},
				
				//enemyHealth
				{name:"healthBarEmpty", path:"assets/images/enemy/healthBarEmpty.png"},
				{name:"healthBar", path:"assets/images/enemy/healthBar.png"},
				
				//intro assets
				{name:"introSky", path:"assets/images/intro/sky.png"},
				{name:"introRocks", path:"assets/images/intro/rocks.png"},
				{name:"introRoad", path:"assets/images/intro/road.png"},
				{name:"cloud1", path:"assets/images/intro/cloud1.png"},
				{name:"cloud2", path:"assets/images/intro/cloud2.png"},
				{name:"4lands", path:"assets/images/intro/4lands.png"},
				{name:"baloon", path:"assets/images/intro/baloon.png"},
				{name:"logoscroll", path:"assets/images/intro/scroll.png"},
				{name:"logoscrollUp", path:"assets/images/intro/scrollUp.png"},
				{name:"logoscrollDown", path:"assets/images/intro/scrollDown.png"},
				{name:"logosword", path:"assets/images/intro/sword.png"},
				{name:"logoquest", path:"assets/images/intro/quest.png"},
				{name:"introShield", path:"assets/images/intro/shield.png"},
				{name:"introEffect", path:"assets/images/intro/light.png"},
				{name:"btn1", path:"assets/images/intro/btn1.png"},
				{name:"btn2", path:"assets/images/intro/btn2.png"},

				

				//map assets
				{name:"map", path:"assets/images/map/map.jpg"},
				{name:"route1", path:"assets/images/map/route1.png"},
				{name:"route2", path:"assets/images/map/route2.png"},


				//menu assets
				{name:"menu", path:"assets/images/menu/menu.png"},
				{name:"btn_1_0", path:"assets/images/menu/btn_1_0.png"},
				{name:"btn_1_1", path:"assets/images/menu/btn_1_1.png"},
				{name:"btn_1_2", path:"assets/images/menu/btn_1_2.png"},
				{name:"btn_1_3", path:"assets/images/menu/btn_1_3.png"},
				{name:"btn_1_4", path:"assets/images/menu/btn_1_4.png"},
				{name:"btn_0_0", path:"assets/images/menu/btn_0_0.png"},
				{name:"btn_0_1", path:"assets/images/menu/btn_0_1.png"},
				{name:"btn_0_2", path:"assets/images/menu/btn_0_2.png"},
				{name:"btn_0_3", path:"assets/images/menu/btn_0_3.png"},
				{name:"btn_0_4", path:"assets/images/menu/btn_0_4.png"},
				{name:"defence_1", path:"assets/images/menu/shield_1.png"},
				{name:"defence_0", path:"assets/images/menu/shield_0.png"},
				{name:"attack_0", path:"assets/images/menu/attack_0.png"},
				{name:"attack_1", path:"assets/images/menu/attack_1.png"},
				
				//level images
				{name:"level_ice", path:"assets/images/levels/ice.jpg"},
				{name:"level_vulcano", path:"assets/images/levels/vulcano.jpg"},
				{name:"level_forest", path:"assets/images/levels/forest.jpg"},
				{name:"nextMap", path:"assets/images/levels/next.png"},


				],
				
				sounds:[
				//{name:"",paths:["ogg","mp3"]}
				],

				bitmapfont:[
				{name:"carrier_command",imgpath:"assets/fonts/carrier_command.png",xmlpath:"assets/fonts/carrier_command.xml"}
				]
	
			},
		
	//data for custom questions		
	custom:[
	
	{ area:"",
	
	  questions:[
	  		{question:"", answers:[{answer:"",correct:true},{answer:"",correct:false},{answer:"",correct:false}]}
	  ]
		
		
		
		}
	
	
	]
	
	}








