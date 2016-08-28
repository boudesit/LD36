function ColisionManager(game) {
	this.game = game ;
	this.explosion = null;
	this.explosionSound = null;
	this.ennemy = null;
};

ColisionManager.prototype.create = function create() {

	this.explosionSound = game.add.audio('explosionSound');

};

ColisionManager.prototype.ennemyHitHero = function ennemyHitHero(player,ennemy) {

  return true;	
};


ColisionManager.prototype.fireHitEnnemy = function Colision(fire,ennemy) {

			this.ennemy = ennemy;
			this.explosion  = game.add.sprite(this.ennemy.getEnemy().getPosX(),this.ennemy.getPosY() - 50, 'explosion');
			//this.explosion.reset(this.currentEnemy.getPosX(),this.currentEnemy.getPosY() - 50);
	        this.explosion.animations.add('boom');
	        this.explosion.play('boom', 30, false , true);
			this.explosionSound.play();
		

  return true;
};

ColisionManager.prototype.update = function update() {
	
};

