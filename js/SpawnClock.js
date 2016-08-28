var SpawnClock = function(game) {
	this.isRunning = false;
	this.isSpawnAllowed = false;
	this.timer = null;
	this.startSpawn = 0.8;
	this.startDownSpawn = -0,3;
}

SpawnClock.prototype = {
	
	create: function() {
    },

    update: function() {

    },

	_enableSpawn : function(){
		this.isSpawnAllowed = true;
	},
	
	startTimer : function(){
		this.isRunning = true;
		this.timer = game.time.events.add(Phaser.Timer.SECOND * this.startSpawn, this._enableSpawn, this);

	},
	
	stopTimer : function(){ 
		this.isSpawnAllowed = false;
		this.isRunning = false;
	}
}
