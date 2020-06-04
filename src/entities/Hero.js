/// <reference path="../../typings/phaser.d.ts" />
import Phaser from 'phaser';
import StateMachine from 'javascript-state-machine';

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
    // set top speed for hero by setting max velocity for x and y
    this.body.setMaxVelocity(250, 400);
    // slow character down when not acceleratiing
    this.body.setDragX(750);
    // get keyboard keys from scene (game file)
    this.keys = scene.cursorKeys;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (this.keys.left.isDown) {
      // move left with left arrow key
      // reach 250 in quater of a second, set velocity to 4 * 250
      // reduce or increase set velocity value to balance movement speed with hero body movement
      this.body.setAccelerationX(-1000);

      // flip character when running
      this.setFlipX(true);

      // reset the collision rectangle during flip (32-12-12)(horizontal texture atlas - horizontal collission rectangle - offset rectangle)
      this.body.offset.x = 8;
    } else if (this.keys.right.isDown) {
      // move right with right arrorw key
      this.body.setAccelerationX(1000);
      // reset flip when hero is running in opposite direction
      this.setFlipX(false);

      // reset collission rectangle to original offset
      this.body.offset.x = 12;
    } else {
      // set X movement to 0 when no key is pressed
      this.body.setAccelerationX(0);
    }
    if (this.body.onFloor()) {
      this.canDoubleJump = false;
    }
    if (this.body.velocity.y > 0) {
      this.isJumping = false;
    }
    // use this and set variable in if block if u want the character to land completely first before allowing jump again
    const didPressJump = Phaser.Input.Keyboard.JustDown(this.keys.up);

    // set character to jump
    if (didPressJump) {
      if (this.body.onFloor()) {
        this.isJumping = true;
        // flag to allow secound jump while in the air
        this.canDoubleJump = true;
        // jump first time
        this.body.setVelocityY(-400);
      } else if (this.canDoubleJump) {
        this.isJumping = true;
        this.canDoubleJump = false;
        // jump second time
        this.body.setVelocityY(-300);
        // end jump
        this.canDoubleJump = false;
      }
    }

    // if you press the up key for a short time and the jump of the character is less than -150, then set jump velocity to -150
    //  this allows us to control the height of the player so he doesn't always jump too high and die depending on if there is an obstacle that high
    if (!this.keys.up.isDown && this.body.velocity.y < -150 && this.isJumping) {
      this.body.setVelocityY(-150);
    }
  }
}

export default Hero;
