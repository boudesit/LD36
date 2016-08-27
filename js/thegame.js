var theGame = function(game) {
	this.game = game;
	this.music = null;
	this.heroManager = null;
}

theGame.prototype = {
  	create: function() {

  		music = game.add.audio('gameSound',0.2, true);

  		game.stage.backgroundColor = "#d2e1c3";
  		game.add.tileSprite(0 , 0, 800, 600, 'background');

  		if (music.isPlaying == false)
  		{
    	    music.play();
    	}else{
    		music.resume();
    	}	


		this.heroManager = new HeroManager(this.game);
		this.heroManager.create();

		this.enemyManager = new EnemyManager(this.game);
		this.enemyManager.create();
	},

	update: function() {
		this.heroManager.update();
		this.enemyManager.update();
	},

	lose: function() {
		music.pause();
		this.game.state.start("GameOver");	
	}
}