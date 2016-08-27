var theGame = function(game) {
	this.game = game;
	this.music = null;
    this.heroManager = null;
    this.colisionManager = null
    this.ennemy = null
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


  	  this.colisionManager = new ColisionManager();
  	  this.colisionManager.create();

      this.heroManager = new HeroManager(this.game);
      this.heroManager.create();

	},

	update: function() {
      this.heroManager.update();
      var isDead =  game.physics.arcade.collide(this.hero,  this.ennemy, this.colisionManager.ennemyHitHero(this.hero,this.ennemy) , null, this);
      
      if(isDead == true)
      {
		this.lose();
      }
	},

	lose: function() {
		music.pause();
		this.game.state.start("GameOver");	
	}
}