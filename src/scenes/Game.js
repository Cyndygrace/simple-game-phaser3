/// <reference path="../../typings/phaser.d.ts" />
import Phaser from 'phaser';

// this class houses the main game logic
class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  // preloads all images needed for the game
  preload() {
    // how to load an image to the scene
    this.load.image('logo', 'assets/phaser3-logo.png');
  }

  // creating a new game object and adding it to the scene
  // check docs for game object factory class
  create(data) {
    // set x and y position of the key/image we want to use , which is also defined in the preload method.
    this.add.image(400, 300, 'logo');
  }

  // calls the method 60 times per sec.
  update(time, delta) { }
}

export default Game;