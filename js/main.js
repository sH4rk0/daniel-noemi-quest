var protoGame = protoGame || {};

			var protoNewGame = new Phaser.Game(800, 600, Phaser.AUTO, "",null,false,true);
			protoNewGame.state.add('Boot',protoGame.Boot);
			protoNewGame.state.add('Preload',protoGame.Preload);
			protoNewGame.state.add('Game',protoGame.Game);
			protoNewGame.state.start('Boot');