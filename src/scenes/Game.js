/// <reference path="../../typings/phaser.d.ts" />
import Phaser from 'phaser';

// this class houses the main game logic
class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  // preloads all images needed for the game
  preload() {
    // how to load an image to the scene with parameters: key, path
    // this.load.image('logo', 'assets/phaser3-logo.png');
    // load sprite sheet with parameters: key, path and dimension
    this.load.spritesheet('hero-run-sheet', 'assets/hero/run.png', {
      frameWidth: 32,
      frameHeight: 64
    })
  }

  // creating a new game object and adding it to the scene
  // check docs for game object factory class
  create(data) {
    // set x and y position of the key/image we want to use , which is also defined in the preload method.
    // this.add.image(400, 300, 'logo');
    // add sprite to scene with x and y position, key and index parameters
    // the index parameter specifies which one of the spirite image on the texture atlas should be displayed.
    this.add.sprite(400, 300, 'hero-run-sheet', 5);
  }

  // calls the method 60 times per sec.
  update(time, delta) { }
}

export default Game;