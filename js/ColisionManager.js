function ColisionManager(game) {
	this.game = game ;
};

ColisionManager.prototype.create = function create() {
	explosion = game.add.audio('explosion');
	hit = game.add.audio('hit');
	screenShake = game.add.audio('screenShake');
};

ColisionManager.prototype.ennemyHitHero = function ennemyHitHero(player,ennemy) {

/*	var explosion = explosions.getFirstExists(false);
    explosion.reset(player.body.x, player.body.y);
    explosion.play('explosion', 30, false, true);
*/	return true;	
};


ColisionManager.prototype.fireHitEnnemy = function Colision(hit,ennemy) {


};

ColisionManager.prototype.update = function update() {
	
};

