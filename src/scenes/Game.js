/// <reference path="../../typings/phaser.d.ts" />
import Phaser from 'phaser';
import Hero from '../entities/Hero';
// this class houses the main game logic
class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  // preloads all images needed for the game
  preload() {
    // load tile map
    this.load.tilemapTiledJSON('level-1', 'assets/tilemaps/level-1.json');

    // load tile sets image
    this.load.spritesheet('world-1-sheet', 'assets/titlesets/world-1.png', {
      frameWidth: 32,
      frameHeight: 32,
      margin: 1,
      spacing: 2,
    });
    // load cloud image
    this.load.image('clouds-sheet', 'assets/titlesets/clouds.png');
    // load sprite sheet for standing idle with parameters: key, path and dimension
    this.load.spritesheet('hero-idle-sheet', 'assets/hero/idle.png', {
      frameWidth: 32,
      frameHeight: 64,
    });
    // load sprite sheet for running with parameters: key, path and dimension
    this.load.spritesheet('hero-run-sheet', 'assets/hero/run.png', {
      frameWidth: 32,
      frameHeight: 64,
    });
    // load sprite sheet for pivoting with parameters: key, path and dimension
    this.load.spritesheet('hero-pivot-sheet', 'assets/hero/pivot.png', {
      frameWidth: 32,
      frameHeight: 64,
    });
    // load sprite sheet for jumping with parameters: key, path and dimension
    this.load.spritesheet('hero-jump-sheet', 'assets/hero/jump.png', {
      frameWidth: 32,
      frameHeight: 64,
    });
    // load sprite sheet for double jump flip with parameters: key, path and dimension
    this.load.spritesheet('hero-flip-sheet', 'assets/hero/spinjump.png', {
      frameWidth: 32,
      frameHeight: 64,
    });
    // load sprite sheet for falling with parameters: key, path and dimension
    this.load.spritesheet('hero-fall-sheet', 'assets/hero/fall.png', {
      frameWidth: 32,
      frameHeight: 64,
    });
    // load die sprite
    this.load.spritesheet('hero-die-sheet', 'assets/hero/bonk.png', {
      frameWidth: 32,
      frameHeight: 64,
    });
  }

  // creating a new game object and adding it to the scene
  // check docs for game object factory class
  create(data) {
    // to access all arror keys, shift and space
    this.cursorKeys = this.input.keyboard.createCursorKeys();

    // create animmation for the sprite-sheet
    this.anims.create({
      // key for refernce in other files
      key: 'hero-idle',
      // frame to include all the sprites that forms idle on the spirte sheet (only one frame here)
      frames: this.anims.generateFrameNumbers('hero-idle-sheet'),
    });
    // create animmation for the sprite-sheet
    this.anims.create({
      // key for refernce in other files
      key: 'hero-running',
      // frame to include all the sprites that forms running on the spirte sheet
      frames: this.anims.generateFrameNumbers('hero-run-sheet'),
      // tells phaser to display 10 frames per sec
      frameRate: 10,
      // keep playing continously
      repeat: -1,
    });
    // create animmation for the sprite-sheet
    this.anims.create({
      // key for refernce in other files
      key: 'hero-pivoting',
      // frame to include all the sprites that forms pivoting on the spirte sheet
      frames: this.anims.generateFrameNumbers('hero-pivot-sheet'),
    });
    // create animmation for the sprite-sheet
    this.anims.create({
      // key for refernce in other files
      key: 'hero-jumping',
      // frame to include all the sprites that forms jumping on the spirte sheet
      frames: this.anims.generateFrameNumbers('hero-jump-sheet'),
      // tells phaser to display 10 frames per sec
      frameRate: 10,
      // keep playing continously
      repeat: -1,
    });
    // create animmation for the sprite-sheet
    this.anims.create({
      // key for refernce in other files
      key: 'hero-flipping',
      // frame to include all the sprites that forms flipping on the spirte sheet
      frames: this.anims.generateFrameNumbers('hero-flip-sheet'),
      // tells phaser to display 10 frames per sec
      frameRate: 30,
      // keep playing continously
      repeat: -1,
    });
    // create animmation for the sprite-sheet
    this.anims.create({
      // key for refernce in other files
      key: 'hero-falling',
      // frame to include all the sprites that forms falling on the spirte sheet
      frames: this.anims.generateFrameNumbers('hero-fall-sheet'),
      // tells phaser to display 10 frames per sec
      frameRate: 10,
      // keep playing continously
      repeat: -1,
    });
    // create animmation for the sprite-sheet
    this.anims.create({
      // key for refernce in other files
      key: 'hero-dead',
      // frame to include all the sprites that forms falling on the spirte sheet
      frames: this.anims.generateFrameNumbers('hero-die-sheet'),
    });

    this.addMap();
    // call hero method with the arguments
    this.addHero();
    // add camera
    this.cameras.main.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );

    // create map image
  }
  addHero() {
    // set hero start position at the start of game
    this.hero = new Hero(this, this.spawnPos.x, this.spawnPos.y);
    // to view the rest of the world to the end that is hidden when screen loads as hero is moving
    this.cameras.main.startFollow(this.hero);
    // switch index of foreground and hero so that foreground is drawn infront of hero
    this.children.moveTo(
      this.hero,
      this.children.getIndex(this.map.getLayer('Foreground').tilemapLayer)
    );
    // set collission detection between the hero and the ground/tiles
    const groundCollider = this.physics.add.collider(
      this.hero,
      this.map.getLayer('Ground').tilemapLayer
    );
    // set collission detection between the spikes and hero then call the kill method once 
    const spikeCollider = this.physics.add.overlap(
      this.hero,
      this.spikeGroup,
      () => {
        this.hero.kill();
  }
    );
    // what should happen to hero once killed
    // let hero bounce of the screen by removing all collision detecttion with spikes, ground tiles and canvas boundary
    // prevent camera from following hero.
    this.hero.on('died', () => {
      groundCollider.destroy();
      spikeCollider.destroy();
      this.hero.body.setCollideWorldBounds(false);
      this.cameras.main.stopFollow();
    });
  }

  addMap() {
    // get the level-1 json file, then use to render the images to the browser
    this.map = this.make.tilemap({ key: 'level-1' });
    // render the different images/ sections
    const groundTiles = this.map.addTilesetImage('world-1', 'world-1-sheet');
    const backgroundTiles = this.map.addTilesetImage('clouds', 'clouds-sheet');
    const backgroundLayer = this.map.createStaticLayer(
      'Background',
      backgroundTiles
    );
    // set clouds to scroll slowly while hero is on the move
    backgroundLayer.setScrollFactor(0.6);
    // returns a reference to the layer
    const groundLayer = this.map.createStaticLayer('Ground', groundTiles);
    // set true to the id of the tiles u want the hero to collide with
    groundLayer.setCollision([1, 2, 4], true);
    // add foreground
    this.physics.world.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );
    this.physics.world.setBoundsCollision(true, true, false, true);

    this.spikeGroup = this.physics.add.group({
      immovable: true,
      allowGravity: false,
    });
// get position of hero for the start of game
    this.map.getObjectLayer('Objects').objects.forEach((object) => {
      if (object.name === 'Start') {
        this.spawnPos = { x: object.x, y: object.y };
      }
      if (object.gid === 7) {
        const spike = this.spikeGroup.create(
          object.x,
          object.y,
          'world-1-sheet',
          object.gid - 1
        );
        // reposition spike
        spike.setOrigin(0, 1);
        // reduce size of spike
        spike.setSize(object.width - 10, object.height - 10);
        // reduce collision rectangle for spike
        spike.setOffset(5, 10);
      }
    });
    this.map.createStaticLayer('Foreground', groundTiles);
  }
  // calls the method 60 times per sec.
    // End and restart game once hero is dead and falls of the screen
    const cameraButtom = this.cameras.main.getWorldPoint(
      0,
      this.cameras.main.height
    ).y;
    if (this.hero.isDead() && this.hero.getBounds().top > cameraButtom + 100) {
      this.hero.destroy();
      this.addHero();
    }
  }
}

export default Game;
