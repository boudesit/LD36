var EnemyManager = function(game) {
	this.game = game;
	this.currentSpeed = -500;
	this.upSpeed = -10;
	this.currentEnemy = null;
	this.outOfGamePos = 50;
	this.spawnClock = null;
	this.maxSpeed = -1200;
	this.enemiesOut = 0;
}

EnemyManager.prototype = {
    create: function() {
		// random enemy
		var random = (this._randomIntFromInterval(1,4)-1);
		this.currentEnemy = new Enemy(game, this.currentSpeed, this._randomType(), random);
		this.currentEnemy.create();
		this.spawnClock = new SpawnClock(game);
		this.enemiesOut = 0;
    },

    update: function() {
		if (this._isEnemyDead() && !this._isSpriteDestroy()) {
			this._killEnemy();
		}else if (this._OutOfGamePosition()) {
			this._destroyEnemy();
		}else {
			this.currentEnemy.update();
		}		
		this._startSpawnClock();

		this._initEnemyAndStopClock();

		if (this.currentEnemy.getEnemiesOut() > 0) {
			this.currentEnemy.setEnemiesOut(this.currentEnemy.getEnemiesOut() - 1);
			this.enemiesOut++;
		}
    },
	
	_initEnemyAndStopClock : function () {
		if(this.spawnClock.isSpawnAllowed == true) {
			this._initEnemy();
			this.spawnClock.stopTimer();
		}
	},
	
	_startSpawnClock : function () {
		if (this.spawnClock.isRunning == false) {
			this.spawnClock.startTimer();
		}
	},
	
	_destroyEnemy : function () {

		//TODO Changer la condition a cause du update c'est lancer plein de foit 
		this.currentEnemy.destroy();
	},
	
	_killEnemy : function () {

		//TODO Changer la condition a cause du update c'est lancer plein de foit 

		this.currentEnemy.kill();
	},
	
	_initEnemy : function() {
		this._upCurrentSpeed();
		this.game.currentSpeed = this.currentSpeed;
		this.currentEnemy = new Enemy(game, this.currentSpeed, this._randomType(), (this._randomIntFromInterval(1,4)-1));
		this.currentEnemy.create();
		this.currentEnemy.update();
	},
	
	_upCurrentSpeed : function() {
		if (this.currentSpeed > (this.maxSpeed -1)) {
			this.currentSpeed += this.upSpeed;
		} else {
			this.currentSpeed = this.maxSpeed;
		}
	},
	
	getEnemy: function() {
		return this.currentEnemy;
	},
	
	_isEnemyDead : function() {
		return (this.currentEnemy.isDead == true);
	},
	
	_OutOfGamePosition : function() {
		return (this.currentEnemy.getPosX() <= this.outOfGamePos);
	},

	_isSpriteDestroy: function() {
		return this.currentEnemy.getIsSpriteDestroy();
	},

	_randomType : function() {
		return (this._randomIntFromInterval(1, 3) - 1);
	},

	_randomIntFromInterval : function(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	},

	_explode : function(min, max) {

	},

	_getEnemiesOut : function() {
		return this.enemiesOut;
	}

}