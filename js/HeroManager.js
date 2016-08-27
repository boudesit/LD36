var HeroManager = function(game) {
	this.game = game;
	this.sprite = null;
	this.spriteDeath = null;
	this.posX = 130;
	this.posY = 450;

}

HeroManager.prototype = {
    create: function() {

	this.sprite = this.game.add.sprite(this.posX,this.posY, 'hero_idle');
	this.sprite.animations.add('idle', [0,1,2,3]);
	this.game.physics.arcade.enable(this.sprite);
	this.sprite.physicsBodyType = Phaser.Physics.ARCADE;

	this.sprite.enableBody = true;
	this.sprite.animations.play('idle', 5, true);

    this.sprite.body.collideWorldBounds=true;


    },

    update: function() {
    	console.log(this.sprite.position.y);
    	if(game.input.keyboard.isDown(Phaser.Keyboard.UP) &&  this.sprite.position.y == 450){

    		this._jump();
    	} else if(this.sprite.position.y < 215) {

    		this._ohGravity();
    	}
    },


    _jump : function(){

    	this.sprite.body.velocity.y = -1000;
    },

    _ohGravity : function(){

    	this.sprite.body.velocity.y = 1000;
    }
}