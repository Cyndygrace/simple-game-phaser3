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
    this.input = {};

    this.setupMovement();
  }
  // method responsible for creating our animation state machine
  setupAnimations() {
    this.animState = new StateMachine({
      init: 'idle',
      transitions: [
        { name: 'idle', from: ['falling', 'running', 'pivoting'], to: 'idle' },
        { name: 'run', from: ['falling', 'idle', 'pivoting'], to: 'running' },
        { name: 'pivot', from: ['falling', 'running'], to: 'pivoting' },
        { name: 'jump', from: ['idle', 'running', 'pivoting'], to: 'jumping' },
        { name: 'flip', from: ['jumping', 'falling'], to: 'flipping' },
        {
          name: 'fall',
          from: ['idle', 'running', 'pivoting', 'jumping', 'flipping'],
          to: 'falling',
        },
      ],
      methods: {
        // this method gets called everytime the state changes and will be passed information about the state change which will be in the lifecycle object
        onEnterState: (lifecycle) => {
          // we can get the name of the state we just moved to via lifecycle.to
          // convinient way of preventing us from writing a custom code from setting animation on each sprite
          this.anims.play('hero-' + lifecycle.to);
          console.log(lifecycle);
        },
      },
    });
    // add logic for triggering state changes
    // first create predicates
    this.animPredicates = {
      // next, create a method for each transition making sure that the method name mathes each of the transition name
      idle: () => {
        // check if hero is on the ground and not moving horizontally
        return this.body.onFloor() && this.body.velocity.x === 0;
      },
      run: () => {
        // Math.sign(this.body.velocity.x) will return -1 if the velocity is less than 0, or return 0 if velocity === 0, or return 1 if velocity > 0
        // checck if we are moving horizontally and if we are facing the direction we are moving
        return (
          this.body.onFloor() &&
          Math.sign(this.body.velocity.x) === (this.flipX ? -1 : 1)
        );
      },
      pivot: () => {
        return (
          this.body.onFloor() &&
          Math.sign(this.body.velocity.x) === (this.flipX ? 1 : -1)
        );
      },
      jump: () => {
        return this.body.velocity.y < 0;
      },
      flip: () => {
        return this.body.velocity.y < 0 && this.moveState.is('flipping');
      },
      fall: () => {
        return this.body.velocity.y > 0;
      },
    };
  }
  setupMovement() {
    this.moveState = new StateMachine({
      init: 'standing',
      transitions: [
        { name: 'jump', from: 'standing', to: 'jumping' },
        { name: 'doubleJump', from: 'jumping', to: 'doubleJumping' },
        {
          name: 'fall',
          from: 'standing',
          to: 'falling',
        },
        {
          name: 'touchDown',
          from: ['jumping', 'doubleJumping', 'falling'],
          to: 'standing',
        },
      ],
      methods: {
        onEnterState: (lifecycle) => {
          console.log(lifecycle);
        },
        onJump: () => {
          this.body.setVelocityY(-400);
        },
        onDoubleJump: () => {
          this.body.setVelocityY(-300);
        },
      },
    });
    this.movePredicates = {
      jump: () => {
        return this.input.didPressJump;
      },
      doubleJump: () => {
        return this.input.didPressJump;
      },
      fall: () => {
        return !this.body.onFloor();
      },
      touchDown: () => {
        return this.body.onFloor();
      },
    };
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    // returns boolean. returns true if the up key is pressed
    this.input.didPressJump = Phaser.Input.Keyboard.JustDown(this.keys.up);

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
    // if you press the up key for a short time and the jump of the character is less than -150, then set jump velocity to -150
    //  this allows us to control the height of the player so he doesn't always jump too high and die depending on if there is an obstacle that high
    if (this.moveState.is('jumping') || this.moveState.is('doubleJumping'))
      if (!this.keys.up.isDown && this.body.velocity.y < -150) {
        this.body.setVelocityY(-150);
      }
    for (const t of this.moveState.transitions()) {
      if (t in this.movePredicates && this.movePredicates[t]()) {
        this.moveState[t]();
        break;
      }
    }
  }
}

export default Hero;
