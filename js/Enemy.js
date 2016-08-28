function Enemy(game, velocity, type, spriteNumber) {
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
	this.spriteNo = spriteNumber % 3;
	this.isSpriteDestroy;
};

var types = ["up", "down", "shot"];
var yDiff = [90, 0, 100];
var animation = 15;
var enemyTab = new Array();
var enemyTabShot = new Array();


Enemy.prototype.create = function create() {
	this.enemySprite = game.add.sprite(this.posX, this.posY, "enemy_" + this.type + this.spriteNo);
	
	// animation
	// TODO : code
	
	this.game.physics.arcade.enable(this.enemySprite);
	this.enemySprite.animations.add('idle');
	this.enemySprite.enableBody = true;
	this.enemySprite.body.velocity.x = this.velocity;
	this.enemySprite.animations.play('idle', 5, true);

	if(this.type === "shot"){
		enemyTabShot.push(this.enemySprite);
	}
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

Enemy.prototype.getPosY = function getPosY(){
	return this.enemySprite.y;
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

Enemy.prototype.getEnemiesShot = function getEnemies() {
	return enemyTabShot;
};

Enemy.prototype.clearArray = function clearArray() {
	for (var i = enemyTab.length; i > 0; i--) {
 
 		enemyTab.pop();
 	}
	for (var i = enemyTabShot.length; i > 0; i--) {

 	 	enemyTabShot.pop();
 	}
 };
