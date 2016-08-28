var theGame = function(game) {
	this.game = game;
	this.music = null;
    this.heroManager = null;
    this.colisionManager = null
    this.ennemy = null
    this.explosion = null;
	this.explosionSound = null;
<<<<<<< HEAD
	this.shakeWorld = 0;
=======
  this.spriteBG = null;
>>>>>>> refs/remotes/origin/branch_Tristan
}

theGame.prototype = {
  	create: function() {

  		music = game.add.audio('gameSound',0.2, true);

  		game.stage.backgroundColor = "#d2e1c3";
  		this.spriteBG = game.add.tileSprite(0 , 0, 800, 600, 'spritesheet');
      this.spriteBG.animations.add('spritesheet');
      this.spriteBG.animations.play('spritesheet', 1, true);


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
        game.physics.arcade.overlap( this.heroManager._getFire() ,  this.ennemy.getEnemy().getEnemiesShot() , this.fireHitEnnemy, null, this);
        game.physics.arcade.collide(this.heroManager._getSprite() ,  this.ennemy.getEnemy().getEnemies() , this.ennemyHitHero, null, this);
    	this.ennemy.update();


	  if (this.shakeWorld > 0) 
		{
			var rand1 = game.rnd.integerInRange(-5,5);
			var rand2 = game.rnd.integerInRange(-5,5);
			game.world.setBounds(rand1, rand2, game.width + rand1, game.height + rand2);
			this.shakeWorld--;
		}

		if (this.shakeWorld == 0) {
			game.world.setBounds(0, 0, game.width,game.height);
		}

	},

	ennemyHitHero: function() {
		this.heroManager._setIsDead(true);
        game.time.events.add(Phaser.Timer.SECOND * 1, this.lose, this);
		music.pause();
    	this.ennemy.getEnemy().clearArray();

	},

	fireHitEnnemy: function(fire,ennemy) {

		this.explosion.reset(ennemy.body.x, ennemy.body.y - 50);
	    this.explosion.animations.add('boom');
	    this.explosion.play('boom', 30, false , true);
		this.explosionSound.play();
		this.shakeWorld = 20;
		ennemy.kill();
		fire.kill();
	},

	lose: function() {
		this.game.state.start("GameOver");	
	}
}