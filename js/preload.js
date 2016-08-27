var preload = function(game){}

preload.prototype = {
	preload: function(){ 
        var loadingBar = this.add.sprite(200,240,"loading");
        this.load.setPreloadSprite(loadingBar);

        //Spritesheet
		this.game.load.spritesheet('hero_idle', 'assets/img/hero_idle.png', 150,150,2); 
		this.game.load.spritesheet('hero_slip', 'assets/img/hero_slip.png', 150,75,1); 
		this.game.load.spritesheet('enemy_up', 'assets/img/enemy_up.png', 33,33,2);
		this.game.load.spritesheet('enemy_down', 'assets/img/enemy_down.png', 33,33,2);
		this.game.load.spritesheet('enemy_shot', 'assets/img/enemy_shot.png', 33,33,2);

		//Image
		this.game.load.image("gametitle","assets/img/gametitle.jpg");
		this.game.load.image("gameover","assets/img/gameover.jpg");
		this.game.load.image("background", "assets/img/Game_BG.png");  

		//Sound
    	game.load.audio('gameSound', 'assets/sound/gameSound.mp3');
    	game.load.audio('introSound', 'assets/sound/introSound.mp3'); 
    	game.load.audio('loseSound', 'assets/sound/loseSound.mp3'); 
  
	},
  	create: function(){
  		this.game.time.events.add(Phaser.Timer.SECOND * 2, this._startGame, this);	
	},
	_startGame: function(){
		this.game.state.start("GameTitle");
	}
}