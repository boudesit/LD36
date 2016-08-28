var gameOver = function(game){
}

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
		
    	var style = { font: "32px Arial", fill: "#000000", align: "center" };

    	text = game.add.text(450, 325, this.game.scoreTotal, style);
		
		this.restartButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		this.restartButton.onDown.add(this.playTheGame, this);
	},
	playTheGame: function(){
		loseSound.pause();
		this.game.state.start("TheGame");
	}
}