var SpawnClock = function(game) {
	this.isRunning = false;
	this.isSpawnAllowed = false;
	this.timer = null;
	this.startSpawn = 2;
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
		if(this.startSpawn > 0){
			this.startSpawn += this.startDownSpawn;
		}else{
			this.startSpawn = 0;
		}
	},
	
	stopTimer : function(){ 
		this.isSpawnAllowed = false;
		this.isRunning = false;
	}
}
