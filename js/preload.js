var preload = function(game){}

preload.prototype = {
	preload: function(){ 
        var loadingBar = this.add.sprite(200,240,"loading");
        this.load.setPreloadSprite(loadingBar);

        //Spritesheet
		this.game.load.spritesheet('hero_idle', 'assets/img/hero_idle.png', 150,150,2); 
		this.game.load.spritesheet('hero_slip', 'assets/img/hero_slip.png', 150,75,1); 
		this.game.load.spritesheet('explosion', 'assets/img/explode.png', 128, 128);


		this.game.load.spritesheet('enemy_up', 'assets/img/enemy_up.png', 150,150,1); 
		this.game.load.spritesheet('enemy_shot', 'assets/img/enemy_shot.png', 150,75,1); 
		this.game.load.spritesheet('enemy_down', 'assets/img/enemy_down.png', 128, 128,1);


		this.game.load.spritesheet('perso_ss', 'assets/img/perso_ss.png', 100,92,5); 
		this.game.load.spritesheet('strike', 'assets/img/strike.png', 600,300,1); 
/*		this.game.load.spritesheet('enemy_down', 'assets/img/enemy_down.png', 128, 128,1);
*/

		//Image
		this.game.load.image("gametitle","assets/img/gametitle.jpg");
		this.game.load.image("gameover","assets/img/gameover.jpg");
    	this.game.load.image('bullet', 'assets/img/bullet.png');
		this.game.load.image("background", "assets/img/Game_BG.png");  


		//Sound
    	game.load.audio('gameSound', 'assets/sound/gameSound.mp3');
    	game.load.audio('introSound', 'assets/sound/introSound.mp3'); 
    	game.load.audio('loseSound', 'assets/sound/loseSound.mp3'); 
  		game.load.audio('explosionSound', 'assets/sound/explodeSound.mp3');
	},
  	create: function(){
  		this.game.time.events.add(Phaser.Timer.SECOND * 2, this._startGame, this);	
	},
	_startGame: function(){
		this.game.state.start("GameTitle");
	}
}