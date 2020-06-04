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
    // load sprite sheet with parameters: key, path and dimension
    this.load.spritesheet('hero-run-sheet', 'assets/hero/run.png', {
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
      key: 'hero-running',
      // frame to include all the sprites that forms running on the spirte sheet
      frames: this.anims.generateFrameNumbers('hero-run-sheet'),
      // tells phaser to display 10 frames per sec
      frameRate: 10,
      // keep playing continously
      repeat: -1,
    });
    // call hero method with the arguments
    this.hero = new Hero(this, 250, 160);
  }

  // calls the method 60 times per sec.
  update(time, delta) {}
}

export default Game;
