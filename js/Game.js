var PlatfomerGame = PlatformerGame || {};

//title screen
PlatformerGame.Game = function(){};

PlatformerGame.Game.prototype = {
    create: function() {
        this.sky1 = this.game.add.sprite(0, 0, 'sky');
        this.sky1.scale.setTo(10, 1.5);

        var wall_y = 100;
        var wall_x = 0;
        while (wall_x < this.game.world.width) {
            this.wallpiece = this.game.add.sprite(wall_x, wall_y, 'wall');
            wall_x += 32;
        }
        this.showDebug = false;

        this.player = this.game.add.sprite(230, 400, 'box1');
        this.player2 = this.game.add.sprite(230, 400, 'box2');
        this.player.anchor.setTo(0.5);
        //this.player2.anchor.setTo(0.5);


        this.game.physics.arcade.enable(this.player);
        this.player.body.setSize(50, 10, 0, 11);
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 400;
        this.player.anchor.setTo(0.5);
        this.player.body.collideWorldBounds = true;

//        this.player = this.game.add.sprite(0, 0, 'box1');

//        this.game.camera.follow(this.player);

        //  Our two animations, walking left and right.
   //     this.player.animations.add('left', [4, 5], 10, true);
     //   this.player.animations.add('right', [4, 5], 10, true);

        this.eggs = this.game.add.group();
        this.eggs.enableBody = true;

        this.collected_eggs = this.game.add.group();

        this.wall = this.game.add.group();
        this.wall.enableBody = true;


        var wall_y = 500;
        var wall_x = 0;
        while (wall_y < 600) {
            while (wall_x < this.game.world.width) {
                this.wallpiece = this.wall.create(wall_x, wall_y, 'wall');
                wall_x += 32;
                this.wallpiece.body.moves = false;
            }
            wall_y += 32;
            wall_x = 0;
        }

        this.music = this.game.add.audio('music');
        this.music.loop = true;
//        this.music.play();

        this.cursors = this.game.input.keyboard.createCursorKeys();
        
        this.timer = 0;

        this.fails = 0;
        this.numberOfEggsCollected = 0;

        this.deathsRemaining = 3;

        this.scoreText = this.game.add.text(16, 16, 'Number of eggs saved: ' + this.numberOfEggsCollected, { fontSize: '32px', fill: '#000' });
        this.deathText = this.game.add.text(580, 16, 'Deaths left: ' + this.deathsRemaining, { fontSize: '32px', fill: '#000' });


    },


    update: function() {
        this.timer++;

        if (this.timer % 200 == 0 ||  this.game.rnd.integerInRange(0, 500) == 0) {
            this.egg = this.eggs.create(100 + this.game.rnd.integerInRange(0, 600), 100 - 32, 'angryegg');
            this.egg.egg = true;
            this.egg.body.gravity.y = 300;


        }

        //  Collide the player and the bag with the platforms
        this.game.physics.arcade.collide(this.player, this.wall);
//        this.game.physics.arcade.collide(this.eggs, this.wall);

        //  Checks to see if the player overlaps with the bag, if he does call the collectTeabag function
        this.game.physics.arcade.overlap(this.player, this.eggs, this.collectEgg, null, this);
        this.game.physics.arcade.overlap(this.eggs, this.wall, this.crash, null, this);

        //  Reset the players velocity (movement)
        this.player.body.velocity.x = 0;

        if (this.cursors.left.isDown)
        {
            //  Move to the left
            this.player.scale.setTo(-1, 1);
            this.player.body.velocity.x = Math.min(-300 + (this.numberOfEggsCollected*20), -60);

            this.player.animations.play('left');
        }
        else if (this.cursors.right.isDown)
        {
            //  Move to the right
            this.player.scale.setTo(1, 1);
            this.player.body.velocity.x = Math.max(300 - (this.numberOfEggsCollected*20), 60);

            this.player.animations.play('right');
        }
        else
        {
            //  Stand still
            this.player.animations.stop();

            this.player.frame = 3;
        }
        
        //  Allow the player to jump if they are touching the ground.
        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.body.velocity.y = Math.min(-60, -300 + (this.numberOfEggsCollected*20));
        }

        this.player2.x = this.player.body.x - 6;
        this.player2.y = this.player.body.y - 22;

            var i = 0;
        this.collected_eggs.forEach(function(egg) {
            if (i % 4 ==0) {
                i = 0;
            }
            egg.x = this.player.body.x + egg.offsetX - 6 + i*10;
            egg.y = this.player.body.y + egg.offsetY - 22;
            i+= 1;
        }, this);


    },

    death: function() {
                this.gameOVer = this.game.add.text(316, 256, 'Game over', { fontSize: '32px', fill: '#000' });

        this.game.paused = true;
    },

    crash: function(egg, wall) {
        if (egg.alive) {
            this.wallpiece = this.game.add.sprite(egg.body.x, egg.body.y - 4, 'egg');
            
            egg.kill();
            this.deathsRemaining--;
            this.deathText.text = "Deaths left: " + this.deathsRemaining;
            if (this.deathsRemaining < 1) {
                this.death();
            }
            }
    },

    collectEgg : function(player, egg) {
        newegg = this.collected_eggs.create(egg.body.x, egg.body.y - 6, 'angryegg2');
        newegg["offsetY"] = parseInt(player.body.y - egg.body.y);
        newegg["offsetX"] = parseInt(player.body.x - egg.body.x);
        this.game.world.bringToTop(this.player2);        egg.kill();

        player.body.velocity.y -= 60;
        this.numberOfEggsCollected++;
        this.scoreText.text = 'Number of eggs saved: ' + this.numberOfEggsCollected;
    },

    render: function() {

        if (this.showDebug) {
            this.game.debug.body(this.player);
        }
    },

};
