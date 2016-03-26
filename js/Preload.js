var PlatformerGame = PlatformerGame || {};

//loading the game assets
PlatformerGame.Preload = function(){};

PlatformerGame.Preload.prototype = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

    this.game.load.spritesheet('logo-tiles', 'assets/images/logo-tiles.png', 17, 16);
    this.game.load.spritesheet('tiles', 'assets/images/bitslap-minild62.png', 16, 16);
    this.load.tilemap('level1', 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('sky', 'assets/images/sky_new.png');
    this.game.load.image('egg', 'assets/images/egg.png');
    this.game.load.image('angryegg', 'assets/images/angryegg.png');
    this.game.load.image('angryegg2', 'assets/images/angryegg2.png');
    this.game.load.image('box1', 'assets/images/box1.png');
    this.game.load.image('box2', 'assets/images/box2.png');
    this.game.load.image('wall', 'assets/images/wall.png');

    this.game.load.audio('music', 'assets/audio/music.ogg');

  },
  create: function() {
    this.state.start('Game');
  }
};
