function Enemy(game, velocity, type) {
	var tabPos = type % 3;
	this.game = game;
	this.enemySprite = null;
	this.isDead = null;
	this.velocity = velocity;
	this.type = types[tabPos];
	this.cursors = null;
	this.posX = 800;
	this.posY = 450 - yDiff[tabPos];
	this.isDead = false;
	this.isDraw = false;
	this.isSpriteDestroy;
};

var types = ["up", "down", "shot"];
var yDiff = [100, 0, 50];
var animation = 15;
var enemyTab = new Array();


Enemy.prototype.create = function create() {
	this.enemySprite = game.add.sprite(this.posX, this.posY, "enemy_" + this.type);
	
	// animation
	// TODO : code
	
	this.game.physics.arcade.enable(this.enemySprite);
	this.enemySprite.enableBody = true;
	this.enemySprite.body.velocity.x = this.velocity;

	enemyTab.push(this.enemySprite);
};

Enemy.prototype.update = function update() {
};

Enemy.prototype.destroy = function destroy() {
	this.enemySprite.destroy();
};

Enemy.prototype.kill = function kill() {
	this.enemySprite.destroy();
	
	// animation
	// TODO : code
	
	//this.enemySprite.enableBody = true;
	//this.enemySprite.body.velocity.x = 0;
	//game.time.events.add(2000, this.destroy(), this);
};


Enemy.prototype.setisDead = function setisDead(isDead) {
	this.isDead = isDead;
};

Enemy.prototype.setIsSpriteDestroy = function setIsSpriteDestroy(isSpriteDestroy) {
	this.isSpriteDestroy = isSpriteDestroy;
};

Enemy.prototype.getIsSpriteDestroy = function getIsSpriteDestroy() {
	return this.isSpriteDestroy;
};

Enemy.prototype.setisDraw = function setisDraw(isDraw) {
	this.isDraw = isDraw;
};

Enemy.prototype.getisDraw = function getisDraw() {
	return this.isDraw;
};

Enemy.prototype.getPosX = function getPosX(){
	return this.enemySprite.x;
};

Enemy.prototype.getType = function getType() {
	return this.type;
};

Enemy.prototype.getSprite = function getSprite() {
    return this.enemySprite;
};

Enemy.prototype.getEnemies = function getEnemies() {
	return enemyTab;
};