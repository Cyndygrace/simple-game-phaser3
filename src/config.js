/// <reference path="../typings/phaser.d.ts" />

import Phaser from 'phaser';

// export setting we need to run our game
export default {
  // type of canvas is automatically set by phaser(either webGL or html canvas depending on the environment)
  type: Phaser.AUTO,
  // id of the div in the html that the canvas will be added to
  parent: 'game',
  // background color of the canvas
  backgroundColor: '#33A5E7',
  scale: {
    width: 800,
    height: 600,
    // FIT is use by phaser to fill the screen with the defined width and height of the canvas
    mode: Phaser.Scale.FIT,
    // center horizontally and vertically
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    // specigy physics engine
    default:'arcade',
    arcade: {
      // set gravity to velocity of 750pixel per second to any physics body in downwards direction.
      gravity: {y: 750 },
      // for debugging purposes
      debug: true,
      debugShowVelocity: true,
      debugShowBody: true,
      debugShowStaticBody: true,

    }

  }
};
