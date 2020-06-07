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
    // call hero method with the arguments
    this.hero = new Hero(this, 250, 160);
    // provide a platform for the hero to fall from
    // we use a rectangle method and specify x and y position with breath and height amd color.
    const platform = this.add.rectangle(220, 240, 260, 10, 0x4bcb7c);
    // add a physics body with static to true, which means it cannot be moved by other objects
    this.physics.add.existing(platform, true);
    //cause a collision interaction between the rectangle and hero
    this.physics.add.collider(this.hero, platform);
  }

  // calls the method 60 times per sec.
  update(time, delta) {}
}

export default Game;
