// JavaScript Document

gameData.map={
				routes:[
					{id:"ice", name:"Ice hell", sprite:"route1", frames:[5,11], framesPosition:[150,190], bg:"level_ice", position:{x:170,y:20}, 

						levels:[
							
							{name:"First level", steps:3, locked:false, tiles:gameData.tilesMap.ice[0]},
							{name:"Second level", steps:3, locked:false, tiles:gameData.tilesMap.ice[0]},
							{name:"Third level", steps:3, locked:false, tiles:gameData.tilesMap.ice[0]},
							{name:"Forth level", steps:3, locked:false, tiles:gameData.tilesMap.ice[0]},
							{name:"Fifth level", steps:3, locked:true, tiles:gameData.tilesMap.ice[0]},
							{name:"Sixth level", steps:3, locked:true, tiles:gameData.tilesMap.ice[0]},
							{name:"Seventh level", steps:3, locked:true, tiles:gameData.tilesMap.ice[0]},
							{name:"Eighth level", steps:3, locked:true, tiles:gameData.tilesMap.ice[0]},
							{name:"Ninth level", steps:3, locked:true, tiles:gameData.tilesMap.ice[0]}
			
							],

						enemies:[

						{name:"coboldo",health:1,sprite:"enemyIce", level:0,
									anim:{
										idle:{frames:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],speed:8,loop:true},
										attack:{frames:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],speed:8,loop:false},
										death:{frames:[34,41,40,40,39,38],speed:14,loop:false},
										hit:{frames:[32,0,32,0],speed:5,loop:false}
										},
								weapons:{
										ranged:[{frames:[40],attack:1,damage:(1*6),bonus:0}]

										}
								}

								
			/*{name:"coboldo",health:10,sprite:"enemyRock",
				anim:{
					idle:{frames:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],speed:8,loop:true},
					attack:{frames:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],speed:8,loop:false},
					death:{frames:[32,33,33,33,33,34],speed:14,loop:false}
				},
				weapons:{
						ranged:[{frames:[33],attack:1,damage:(1*6),bonus:1}]

						}
			}

			*/

/*
			{name:"gnomo",health:20,sprite:"enemyRock",
				anim:{
					idle:{frames:[16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],speed:8,loop:true},
					attack:{frames:[16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],speed:8,loop:false},
					death:{frames:[34,35,36,36,37,38,38,38],speed:14,loop:false}
				},
				weapons:{
						ranged:[{frames:[33],attack:1,damage:(1*8),bonus:1}]

						}
				
			}*/



								]	
					},

					{id:"fire", name:"Land of Fire", sprite:"route2", frames:[2,8],  framesPosition:[410,350], bg:"level_vulcano", position:{x:640,y:400}, 

						levels:[
							
		                    {name:"First level", steps:3, locked:false, tiles:gameData.tilesMap.fire[0]},
							{name:"Second level", steps:3, locked:false, tiles:gameData.tilesMap.fire[0]},
							{name:"Third level", steps:3, locked:true, tiles:gameData.tilesMap.fire[0]},
							{name:"Forth level", steps:3, locked:true, tiles:gameData.tilesMap.fire[0]},
							{name:"Fifth level", steps:3, locked:true, tiles:gameData.tilesMap.fire[0]},
							{name:"Sixth level", steps:3, locked:true, tiles:gameData.tilesMap.fire[0]},
							{name:"Seventh level", steps:3, locked:true, tiles:gameData.tilesMap.fire[0]},
							{name:"Eighth level", steps:3, locked:true, tiles:gameData.tilesMap.fire[0]},
							{name:"Ninth level", steps:3, locked:true, tiles:gameData.tilesMap.fire[0]}
							
							]
					}
				
				
				]
		
		
			}


