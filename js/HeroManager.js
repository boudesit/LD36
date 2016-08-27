var HeroManager = function(game) {
	this.game = game;
	this.sprite = null;
	this.spriteSlip = null;
	this.posX = 130;
	this.posYspriteSplip = 400;
	this.posY = 300;
	this.isDead = false;
    this.fireButton = null;
    this.weapon = null;
}

HeroManager.prototype = {
    create: function() {

	this.sprite = this.game.add.sprite(this.posX,this.posY, 'perso_ss');
	this.sprite.animations.add('idle', [0,1]);
	this.game.physics.arcade.enable(this.sprite);
	this.sprite.physicsBodyType = Phaser.Physics.ARCADE;

	this.sprite.enableBody = true;
	this.sprite.animations.play('idle', 5, true);

    this.sprite.body.collideWorldBounds=true;

   	this.spriteSlip = this.game.add.sprite(this.posX,this.posYspriteSplip, 'perso_ss');
	this.spriteSlip.animations.add('slip', [3]);
	this.game.physics.arcade.enable(this.spriteSlip);
	this.spriteSlip.physicsBodyType = Phaser.Physics.ARCADE;
	this.spriteSlip.enableBody = true;
	this.spriteSlip.animations.play('slip', 0, true);

    this.spriteSlip.body.collideWorldBounds=true;
	this.spriteSlip.visible = false;


    //  Creates 1 single bullet, using the 'bullet' graphic
    this.weapon = this.game.add.weapon(1, 'strike');
    this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.weapon.bulletSpeed = 400; 
    this.weapon.trackSprite(this.sprite, 1, 0);
    this.weapon.fireAngle = 0;
    },

    update: function() {
    	console.log(this.sprite.position.y);
    	console.log(this.spriteSlip.position.y);

    	if(game.input.keyboard.isDown(Phaser.Keyboard.UP) &&  this.sprite.position.y == 300){

    		this._jump();
    	} else if(this.sprite.position.y < 215) {

    		this._ohGravity();
    	}

    	if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN) &&  this.sprite.position.y == 300){
    		this._slip();
    	} else if (!game.input.keyboard.isDown(Phaser.Keyboard.DOWN) ) {
	    	this.sprite.visible = true;
	    	this.spriteSlip.visible = false;
    	}

        if ( game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
        {

            this.weapon.fire();
        }
    },


    _jump : function(){

    	this.sprite.body.velocity.y = -1000;
    },

    _ohGravity : function(){

    	this.sprite.body.velocity.y = 1000;
    },

    _slip : function() {
    	this.sprite.visible = false;
    	this.spriteSlip.visible = true;
    },

    _getSprite : function() {

    	if(this.sprite.visible) {
    		return this.sprite;
    	} else {
    		return this.spriteSlip;
    	}
    },

    _setIsDead : function(isDead) {

    	this.isDead = isDead;
    },

    _getIsDead : function() {

    	return this.isDead;
    }
}