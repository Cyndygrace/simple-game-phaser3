/// <reference path="../../typings/phaser.d.ts" />
import Phaser from 'phaser';
import config from '../config';

// this class houses the main game logic
class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  // preloads all images needed for the game
  preload() {
    // load sprite sheet with parameters: key, path and dimension
    this.load.spritesheet('hero-run-sheet', 'assets/hero/run.png', {
      frameWidth: 32,
      frameHeight: 64,
    });
  }

  // creating a new game object and adding it to the scene
  // check docs for game object factory class
  create(data) {
    // create animmation for the sprite-sheet
    this.anims.create({
      // key for refernce in other files
      key: 'hero-running',
      // frame to include all the sprites that forms running on the spirte sheet
      frames: this.anims.generateFrameNumbers('hero-run-sheet'),
      // tells phaser to display 10 frames per sec
      frameRate: 6,
      // keep playing continously
      repeat: -1,
    });
    // add sprite defined in preload method to scene with x and y position, key parameters
    // the index parameter specifies which one of the spirite image on the texture atlas should be displayed.
    // .physics, adds the physics descriped in the config to our character
    this.player = this.physics.add.sprite(250, 160, 'hero-run-sheet');
    // add animation to sprite-sheet
    this.player.anims.play('hero-running');

    // prevent body from falling out of the game boundary and collide within the boundary of the world
    this.player.body.setCollideWorldBounds(true);
    // set size of collission rectangle
    this.player.body.setSize(12, 40);
    // set position of collission rectangle
    this.player.body.setOffset(12, 23);
  }

  // calls the method 60 times per sec.
  update(time, delta) {}
}

export default Game;
