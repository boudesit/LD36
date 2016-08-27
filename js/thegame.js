var theGame = function(game) {
	this.game = game;
	this.music = null;

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

	},

	update: function() {

	},

	lose: function() {
		music.pause();
		this.game.state.start("GameOver");	
	}
}