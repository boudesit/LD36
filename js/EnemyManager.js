var EnemyManager = function(game) {
	this.currentSpeed = -300;
	this.upSpeed = -20;
	this.currentEnemy = null;
	this.outOfGamePos = 50;
	this.spawnClock = null;
	this.maxSpeed = -700;
}

EnemyManager.prototype = {
    create: function() {
		// random enemy
		this.currentEnemy = new Enemy(game, this.currentSpeed, this._randomType());
		this.currentEnemy.create();
		this.spawnClock = new SpawnClock(game);
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
		this.currentEnemy.destroy();
	},
	
	_killEnemy : function () {
		this.currentEnemy.kill();
	},
	
	_initEnemy : function() {
		this._upCurrentSpeed();
		this.currentEnemy = new Enemy(game, this.currentSpeed, this._randomType());
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
	}
}