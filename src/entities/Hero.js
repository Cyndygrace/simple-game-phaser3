/// <reference path="../../typings/phaser.d.ts" />
import Phaser from 'phaser';

class Hero extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    // over write sprite constructor config
    super(scene, x, y, 'hero-run-sheet', 0);

    // add hero to scene
    scene.add.existing(this);
    // add hero with physics to scene
    scene.physics.add.existing(this);
    // add animation to sprite-sheet
    this.anims.play('hero-running');

    // prevent body from falling out of the game boundary and collide within the boundary of the world
    this.body.setCollideWorldBounds(true);
    // set size of collission rectangle
    this.body.setSize(12, 40);
    // set position of collission rectangle(distance between the hero and the top-left corner of the texture atlas)
    this.body.setOffset(12, 23);

    // get keyboard keys from scene (game file)
    this.keys = scene.cursorKeys;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (this.keys.left.isDown) {
      // move left with left arrow key
      // reach 250 in quater of a second, set velocity to 4 * 250
      // reduce or increase set velocity value to balance movement speed with hero body movement
      this.body.setVelocityX(-150);

      // flip character when running
      this.setFlipX(true);

      // reset the collision rectangle during flip (32-12-12)(horizontal texture atlas - horizontal collission rectangle - offset rectangle)
      this.body.offset.x = 8;
    } else if (this.keys.right.isDown) {
      // move right with right arrorw key
      this.body.setVelocityX(150);
      // reset flip when hero is running in opposite direction
      this.setFlipX(false);

      // reset collission rectangle to original offset
      this.body.offset.x = 12;
    } else {
      // set X movement to 0 when no key is pressed
      this.body.setVelocityX(0);
    }
  }
}

export default Hero;
