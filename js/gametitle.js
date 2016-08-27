var gameTitle = function(game){}

gameTitle.prototype = {
  	create: function(){

  		introSound = game.add.audio('introSound');

  		this.game.add.sprite(0,0,"gametitle");

  		this.startButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		this.startButton.onDown.add(this.playTheGame, this);

  		if (introSound.isPlaying == false)
  		{
  			introSound.loop = true;
    	    introSound.play();
    	}else{
    		introSound.resume();
    	}	
	},
	playTheGame: function(){
		introSound.pause();
		this.game.state.start("TheGame");
	}
} 