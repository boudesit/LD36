var gameOver = function(game){}

gameOver.prototype = {
	
  	create: function(){

  		loseSound = game.add.audio('loseSound');

  		if (loseSound.isPlaying == false)
  		{
    	    loseSound.play();
    	}else{
    		loseSound.resume();
    	}	

  		var gameOverTitle = this.game.add.sprite(0,0,"gameover");
		

		this.restartButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		this.restartButton.onDown.add(this.playTheGame, this);
	},
	playTheGame: function(){
		loseSound.pause();
		this.game.state.start("TheGame");
	}
}