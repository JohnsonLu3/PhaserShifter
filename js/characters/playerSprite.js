/**
 * The object that represents the player character.
 * This is a child of CustomSprite, and thus is a descendant of Phaser.Sprite.
 * @param {*} game      The Phaser.Game object
 * @param {*} x         The initial x-position of the sprite.
 * @param {*} y         The initial y-position of the sprite.
 * @param {*} asset     The image asset to initialize the sprite with.
 * @param {*} interval  The rate at which the player character changes phases.
 * @param {*} hp        The initial hitpoints of the sprite.
 */
var Player = function(game, x, y, asset, interval, hp) {
    // Call CustomSprite's constructor
    CustomSprite.call(this, game, x, y, asset, interval);
    this.health = hp;
    this.cooldown = 0;
    //Remember the last direction we ran, we will fire bullets in that direction.
    this.facing = 1;     // 1 = right, 0 = left
    this.cooldownAmt = 20;
    this.bulletSpeed = 250;
    this.walkingSpeed = 150;
}

/**
 * Modify player to be different than the CustomSprite.
 */
Player.prototype = Object.create(CustomSprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.setCoolDown = function(cooldown)
{
    if (cooldown > 0)
    {
        this.cooldownAmt = cooldown;
    }
}
Player.prototype.setSpeed = function(speed)
{
    this.bulletSpeed = speed;
}
Player.prototype.setWalkSpeed = function(speed)
{
    this.walkingSpeed = speed;
}
Player.prototype.changePhase = function()
{
    if (this.phase)
    {
       this.tint =  BLUE;
    }
    else
    {
       this.tint = PINK;
    }
    this.phase = !this.phase;
}
Player.prototype.setHealth = function(health)
{
    if (health > 0)
    {
        this. health = health;
    }
}
//Player has no update method, its all controlled by the player.
Player.prototype.update = function(){};
//Fire a bullet from the player
Player.prototype.fire = function(){
    var bullet = playerBullets.getFirstDead();
    if (this.cooldown == 0 && bullet != null && this.alive)
    {
        //Setting back to being alive.
        bullet.reset(this.x + (0.5 * this.width),this.y + (0.5 * this.height));
        //Set the phase and color of this bullet.
        bullet.phase = this.phase;
        if (bullet.phase)
            bullet.tint = PINK;
        else
            bullet.tint = BLUE;
        if (this.dirRight)
        {
            bullet.body.velocity.x = 250;
        }
        else
        {
            bullet.body.velocity.x = -250;
        }
        this.cooldown = 20;
    }
};

/*
Player.prototype = {

    // This function initializes the Player's animations and physics
    init: function() {
        //  We need to enable physics on the player
        game.physics.arcade.enable(this);

        //  Adjust the player hit box
        this.body.setSize(14, 24, 8, 6);

        //  Player physics properties
        this.body.gravity.y = 350;
        this.body.collideWorldBounds = true;

        // Idle
        this.animations.add('idle_B', [0, 1, 2, 3, 4, 5, 6], 10, true);
        this.animations.add('idle_R', [7, 8, 9, 10, 11, 12, 13], 10, true);

        // Walk
        this.animations.add('walk_B', [14, 15, 16, 17, 18, 19, 20], 10, false);
        this.animations.add('walk_R', [21, 22, 23, 24, 25, 26, 27], 10, false);

        // Jump
        this.animations.add('jump_B', [28, 29, 30, 31, 32, 33, 34], 10, false);
        this.animations.add('jump_R', [35, 36, 37, 38, 39, 40, 41], 10, false);

        // Die
        this.animations.add('die', [42, 43, 44, 45, 46, 47, 48], 10, false);
    },

    // Mutator functions
    setCoolDown: function(cooldown) {
        if (cooldown > 0) {
            this.cooldownAmt = cooldown;
        }
    },
    setSpeed: function(speed) {
        this.bulletSpeed = speed;
    },
    setWalkSpeed: function(speed) {
        this.walkingSpeed = speed;
    },
    setHealth: function(health) {
        if (health >= 0) {
            this. health = health;
        }
    },

    // Change the phase of the player
    changePhase: function() {
        if (this.phase) {
            this.tint =  BLUE;
        }
        else {
            this.tint = PINK;
        }

        this.phase = !this.phase;
    },
    

    //Player has no update method, its all controlled by the player.
    update: function() {},

    //Fire a bullet from the player
    fire: function() {
        var bullet = playerBullets.getFirstDead();
        if (this.cooldown == 0 && bullet != null && this.alive)
        {
            //Setting back to being alive.
            bullet.reset(this.x + (0.5 * this.width),this.y + (0.5 * this.height));
            //Set the phase and color of this bullet.
            bullet.phase = this.phase;
            if (bullet.phase)
                bullet.tint = PINK;
            else
                bullet.tint = BLUE;
            if (this.dirRight)
            {
                bullet.body.velocity.x = 250;
            }
            else
            {
                bullet.body.velocity.x = -250;
            }
            this.cooldown = 20;
        }
    }
};
*/