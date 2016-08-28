var HeroManager = function(game) {
	this.game = game;
	this.sprite = null;
	this.spriteSlip = null;
    this.spriteJump = null;
    this.spriteDeath = null;
	this.posX = 200;

	this.posY = 390;
    this.posYSlip = 455;

	this.isDead = false;
    this.fireButton = null;
    this.weapon = null;

    this.isJump = false;
}

HeroManager.prototype = {
    create: function() {

	this.sprite = this.game.add.sprite(this.posX,this.posY, 'perso_ss');
	this.sprite.animations.add('idle', [0,1,2]);
	this.game.physics.arcade.enable(this.sprite);
	this.sprite.physicsBodyType = Phaser.Physics.ARCADE;

	this.sprite.enableBody = true;
	this.sprite.animations.play('idle', 5, true);

    this.sprite.body.collideWorldBounds=true;

   	this.spriteSlip = this.game.add.sprite(this.posX,this.posYSlip, 'perso_ss2');
	this.spriteSlip.animations.add('slip', [0]);
	this.game.physics.arcade.enable(this.spriteSlip);
	this.spriteSlip.physicsBodyType = Phaser.Physics.ARCADE;
	this.spriteSlip.enableBody = true;
	this.spriteSlip.animations.play('slip', 0, true);

    this.spriteSlip.body.collideWorldBounds=true;
	this.spriteSlip.visible = false;


    this.spriteJump = this.game.add.sprite(this.posX,this.posY, 'perso_ss');
    this.spriteJump.animations.add('jump', [2]);
    this.game.physics.arcade.enable(this.spriteJump);
    this.spriteJump.physicsBodyType = Phaser.Physics.ARCADE;
    this.spriteJump.enableBody = true;
    this.spriteJump.animations.play('jump', 0, true);

    this.spriteJump.body.collideWorldBounds=true;
    this.spriteJump.visible = false;



    //  Creates 1 single bullet, using the 'bullet' graphic
    this.weapon = this.game.add.weapon(1, 'strike');
    this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.weapon.bulletSpeed = 400; 
    this.weapon.enableBody = true;
    this.weapon.physicsBodyType = Phaser.Physics.ARCADE;
    this.weapon.trackSprite(this.sprite, 50, 10);
    this.weapon.fireAngle = 0;


    },

    update: function() {

    	if(game.input.keyboard.isDown(Phaser.Keyboard.UP) && !game.input.keyboard.isDown(Phaser.Keyboard.DOWN) &&  this.spriteJump.position.y == this.posY){

    		this._jump();
    	} else if(this.spriteJump.position.y < 250 ) {

    		this._ohGravity();
    	} 

    	if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && !game.input.keyboard.isDown(Phaser.Keyboard.UP) &&  this.spriteJump.position.y == this.posY){
    		this._slip();
    	} else if (!game.input.keyboard.isDown(Phaser.Keyboard.DOWN)  && !this._getIsJump()) {

	    	this.sprite.visible = true;
	    	this.spriteSlip.visible = false;
    	}

        if ( game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && !game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && !game.input.keyboard.isDown(Phaser.Keyboard.UP))
        {

            this.weapon.fire();
        }
        if(this.spriteJump.position.y > 385 && this.spriteJump.body.velocity.y == 1000) {
            this.spriteJump.visible = false;
            this.sprite.visible = true;
            this._setIsJump(false);

            this._recreateSprite();
        }

        if(this._getIsDead()) {
            if(this.spriteDeath != null) {
                this.spriteDeath.kill();
            }

            this.spriteDeath = this.game.add.sprite(this.posX,this._getSprite().position.y, 'perso_ss3');
            this.spriteDeath.animations.add('death', [0]);
            this.game.physics.arcade.enable(this.spriteDeath);
            this.spriteDeath.physicsBodyType = Phaser.Physics.ARCADE;
            this.spriteDeath.enableBody = true;
            this.spriteDeath.animations.play('death', 0, true);

            this.spriteDeath.body.collideWorldBounds=true;
            this.spriteDeath.visible = true;
            this.spriteSlip.visible = false;
            this.sprite.visible = false;
            this.spriteJump.visible = false;




        }

    },


    _jump : function(){
        this._setIsJump(true);
        this.sprite.visible = false;
        this.spriteJump.visible = true;

    	this.spriteJump.body.velocity.y = -500;
    },

    _ohGravity : function(){

    	this.spriteJump.body.velocity.y = 1000;

    },

    _slip : function() {
    	this.sprite.visible = false;
    	this.spriteSlip.visible = true;
    },

    _getSprite : function() {

    	if(this.sprite.visible) {
    		return this.sprite;
    	} else if(this.spriteSlip.visible){
    		return this.spriteSlip;
    	} else {
            return this.spriteJump;
        }
    },

    _setIsDead : function(isDead) {

    	this.isDead = isDead;
    },

    _getIsDead : function() {

    	return this.isDead;
    },
    _recreateSprite : function () {
        this.spriteJump.kill();
        this.spriteJump = this.game.add.sprite(this.posX,this.posY, 'perso_ss');
        this.spriteJump.animations.add('jump', [2]);
        this.game.physics.arcade.enable(this.spriteJump);
        this.spriteJump.physicsBodyType = Phaser.Physics.ARCADE;

        this.spriteJump.enableBody = true;
        this.spriteJump.animations.play('jump', 0, true);

        this.spriteJump.body.collideWorldBounds=true;

        this.spriteJump.visible = false;


    },

    _setIsJump : function(isJump) {

        this.isJump = isJump;
    },


    _getIsJump : function() {

        return this.isJump;
    },

    _getFire: function() {

        return this.weapon.bullets;
    },

    _killFire: function() {

        this.weapon.destroy();

        //  Creates 1 single bullet, using the 'bullet' graphic
        this.weapon = this.game.add.weapon(1, 'strike');
        this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.weapon.bulletSpeed = 400; 
        this.weapon.trackSprite(this.sprite, 50, 10);
        this.weapon.fireAngle = 0;
    }
}