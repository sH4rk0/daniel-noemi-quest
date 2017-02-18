// JavaScript Document
var protoGame = protoGame || {};


protoGame.Boot=function(game){}
protoGame.Boot.prototype={
	
	preload:function(){
		
			var bmd = this.game.add.bitmapData(200,50);
			bmd.ctx.fillStyle = '#0096ff';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 200, 50);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('loadingBar', bmd);
			
			var bmd = this.game.add.bitmapData(800,600);
			bmd.ctx.fillStyle = '#ffffff';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 800, 600);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('loadingContainer', bmd);
			
			bmd = this.game.add.bitmapData(200,50);
			bmd.ctx.fillStyle = '#0096ff';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 200, 50);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('startBtn', bmd);
			
			bmd = this.game.add.bitmapData(200,50);
			bmd.ctx.fillStyle = '#0096ff';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 200, 50);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('button', bmd);

			bmd = this.game.add.bitmapData(200,50);
			bmd.ctx.fillStyle = '#ffffff';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 200, 50);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('comic', bmd);
			
			bmd = this.game.add.bitmapData(30,30);
			bmd.ctx.fillStyle = '#0096ff';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 30, 30);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('path', bmd);
			
			bmd = this.game.add.bitmapData(40,50);
			bmd.ctx.fillStyle = '#0096ff';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 40, 50);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('player', bmd);
			
			bmd = this.game.add.bitmapData(40,50);
			bmd.ctx.fillStyle = '#000000';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 40, 50);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('enemy', bmd);
			
			
			bmd = this.game.add.bitmapData(380,160);
			bmd.ctx.fillStyle = '#ffcc00';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 380, 160);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('menu1', bmd);
			
			bmd = this.game.add.bitmapData(380,160);
			bmd.ctx.fillStyle = '#ffcc00';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 380, 160);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('menu2', bmd);
			
			bmd = this.game.add.bitmapData(40,40);
			bmd.ctx.fillStyle = '#ff0000';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 40, 40);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('button1', bmd);
			
			bmd = this.game.add.bitmapData(40,40);
			bmd.ctx.fillStyle = '#00ff00';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 40, 40);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('button2', bmd);
			
			bmd = this.game.add.bitmapData(40,40);
			bmd.ctx.fillStyle = '#00ffff';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 40, 40);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('defence', bmd);
			
			bmd = this.game.add.bitmapData(40,40);
			bmd.ctx.fillStyle = '#ffff00';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 40, 40);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('attack', bmd);
			
			bmd = this.game.add.bitmapData(80,40);
			bmd.ctx.fillStyle = '#00ff00';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 80, 40);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('okBtn', bmd);
			

			bmd = this.game.add.bitmapData(40,40);
			bmd.ctx.fillStyle = '#f000f0';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 40, 40);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('level', bmd);

			bmd = this.game.add.bitmapData(800,70);
			bmd.ctx.fillStyle = '#ff0000';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 800, 70);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('levelMenu', bmd);

			bmd = this.game.add.bitmapData(50,50);
			bmd.ctx.fillStyle = '#000f0f';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 50, 50);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('topicons', bmd);


			bmd = this.game.add.bitmapData(20,20);
			bmd.ctx.fillStyle = '#f000f0';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 20, 20);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('bonus', bmd);

			

			bmd = this.game.add.bitmapData(50,60);
			bmd.ctx.fillStyle = '#f0f0f0';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 50, 60);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('hitarea', bmd);



			bmd = this.game.add.bitmapData(100,100);
			bmd.ctx.fillStyle = '#000000';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 100, 100);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('fade', bmd);

			bmd = this.game.add.bitmapData(100,50);
			bmd.ctx.fillStyle = '#000000';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 100, 50);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('skip', bmd);

			bmd = this.game.add.bitmapData(100,50);
			bmd.ctx.fillStyle = '#000000';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 100, 50);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('intro', bmd);
		
		},
	
	create:function(){
		
		this.game.stage.backgroundColor = '#ffffff';
		//this.game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;
		this.game.stage.smoothed=false;
		this.game.scale.pageAlignHorizontally = true;
    	this.game.scale.pageAlignVertically = true;
		this.game.state.start('Preload');
		
		
		}
		}