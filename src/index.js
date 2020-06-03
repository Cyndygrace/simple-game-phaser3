// Entry point for our application
/// <reference path="../typings/phaser.d.ts" />

import Phaser from 'phaser';
import config from './config';
import GameScene from './scenes/Game';

// setup a new phaser game instance with configuration in the config file. Also immediately run scene.
new Phaser.Game(Object.assign(config, {
  scene: [GameScene],
}));
