var theGame = function(game) {
	this.game = game;
	this.music = null;
    this.heroManager = null;
    this.colisionManager = null
    this.ennemy = null
    this.explosion = null;
	this.explosionSound = null;
	this.shakeWorld = 0;
    this.spriteBG = null;
	this.white = "#FFFFFF";
	this.score = 0;
	this.enemiesOut = 0;
	this.multiple = 50;
	this.scoreText = null;
}

theGame.prototype = {
  	create: function() {

  		music = game.add.audio('gameSound',0.2, true);

    	this.spriteBG = this.game.add.tileSprite(0, 0, 800, 600, 'background');
    	this.spriteBG.animations.add('backgroundAnime', [0,1,2,3,2,1,0]);
    	this.spriteBG.animations.play('backgroundAnime', 10, true);

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

		this.score = 0;
		this.enemiesOut = 0;
		this.scoreText = this.game.add.text(20, 20, "" + this._getScoreToDisplay(), { font: "30px Arial", fill: this.white});
		this.scoreText.fontWeight = "bold";
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

		if (this.ennemy != undefined) {
			this.enemiesOut = this.ennemy._getEnemiesOut();
		}
		this.scoreText.setText(this._getScoreToDisplay());
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

		this._incrementScore();
	},

	lose: function() {
		this.game.state.start("GameOver");	
	},

	_getScoreToDisplay : function() {
		var bonus = this._getBonus();
		var nb = (this.score + this.enemiesOut);
		var total = nb * this.multiple + bonus;
		this.game.scoreTotal = nb * this.multiple + bonus;
		return total;
	},

	_incrementScore : function() {
		this.score++;
	},

	_getBonus : function() {
		var nb = (this.score + this.enemiesOut);
		if (nb > 10) {
			if (nb % 10 == 0) {
				return ((nb / 10) - 1) * this.multiple;
			} else {
				return ~~(nb / 10) * this.multiple;
			}
		} else{
			return 0;
		}
	}
}