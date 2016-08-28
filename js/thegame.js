var theGame = function(game) {
	this.game = game;
	this.music = null;
    this.heroManager = null;
    this.colisionManager = null
    this.ennemy = null
    this.explosion = null;
	this.explosionSound = null;
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

      this.ennemy = new EnemyManager(this.game);
      this.ennemy.create();

	  this.explosionSound = game.add.audio('explosionSound');
	  this.explosion  = game.add.sprite(-100,-100, 'explosion');
	},

	update: function() {

        this.heroManager.update();
        game.physics.arcade.overlap( this.heroManager._getFire() ,  this.ennemy.getEnemy().getEnemies() , this.fireHitEnnemy, null, this);
        game.physics.arcade.collide(this.heroManager._getSprite() ,  this.ennemy.getEnemy().getEnemies() , this.ennemyHitHero, null, this);
    	this.ennemy.update();
	},

	ennemyHitHero: function() {
		this.heroManager._setIsDead(true);
        game.time.events.add(Phaser.Timer.SECOND * 1, this.lose, this);
		music.pause();
    	this.ennemy.getEnemy().clearArray();
		this.game.state.start("GameOver");	
	},

	fireHitEnnemy: function(fire,ennemy) {

		this.explosion.reset(ennemy.body.x, ennemy.body.y - 50);
	    this.explosion.animations.add('boom');
	    this.explosion.play('boom', 30, false , true);
		this.explosionSound.play();

		ennemy.kill();
		fire.kill();
		this.ennemy._explode();
		this.heroManager._killFire()
	}
}