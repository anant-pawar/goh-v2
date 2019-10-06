import * as Phaser from "../lib/phaser.min";
import Options from "../core/options";
import * as Score from "../service/score";
import * as Input from "../service/inputManager"

let gameOptions = Options();
var scoreText;
var spaceBar;
export default class playGame extends Phaser.Scene {
  constructor() {
    super("PlayGame");
  }
  create() {
    // keeping track of added platforms
    this.addedPlatforms = 0;        
   this.add.image(300,300,"background")

    scoreText = this.add.text(20, 20, 'Score: 0', { fontSize: '32px', fill: '#000', fontFamily: 'Comic Sans MS' });
    
    // group with all active platforms.
    this.platformGroup = this.add.group({
      // once a platform is removed, it's added to the pool
      removeCallback: function(platform) {
        platform.scene.platformPool.add(platform);
      }
    });

    // platform pool
    this.platformPool = this.add.group({
      // once a platform is removed from the pool, it's added to the active platforms group
      removeCallback: function(platform) {
        platform.scene.platformGroup.add(platform);
      }
    });

    // group with all active coins.
    this.coinGroup = this.add.group({
      // once a coin is removed, it's added to the pool
      removeCallback: function(coin) {
        coin.scene.coinPool.add(coin);
      }
    });

    // coin pool
    this.coinPool = this.add.group({
      // once a coin is removed from the pool, it's added to the active coins group
      removeCallback: function(coin) {
        coin.scene.coinGroup.add(coin);
      }
    });

    // number of consecutive jumps made by the player so far
    this.playerJumps = 0;

    // adding a platform to the this.game, the arguments are platform width, x position and y position
    this.addPlatform(
      this.game.config.width,
      this.game.config.width / 2,
      this.game.config.height * gameOptions.platformVerticalLimit[1]
    );

    // adding the player;
    this.player = this.physics.add.sprite(
      gameOptions.playerStartPosition,
      this.game.config.height * 0.7 ,
      "player"
    );

    this.player.setGravityY(gameOptions.playerGravity);

    // setting collisions between the player and the platform group
    this.physics.add.collider(
      this.player,
      this.platformGroup,
      function() {
        // play "run" animation if the player is on a platform
        if (!this.player.anims.isPlaying) {
          this.player.anims.play("run");
        }
      },
      null,
      this
    );
/*
       // setting collisions between the player and the platform group
       this.physics.add.collider(
        this.player,
        this.coinGroup,
        function() {
          console.log("fhhf");
        },
        null,
        this
      );
      */
    // setting collisions between the player and the coin group
    this.physics.add.collider(
      this.player,
      this.coinGroup,
      function(player, coin) {
        this.tweens.add({
          targets: coin,
          y: coin.y - 100,
          alpha: 0,
          duration: 800,
          ease: "Cubic.easeOut",
          callbackScope: this,
          onComplete: function() {
            this.coinGroup.killAndHide(coin);
            this.coinGroup.remove(coin);
            Score.add();
            scoreText.setText("Score: " + Score.get())
          }
        });
      },
      null,
      this
    );

    // checking for input
    this.input.on("pointerdown", this.jump, this);
    spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);    
  }

  // the core of the script: platform are added from the pool or created on the fly
  addPlatform(platformWidth, posX, posY) {
    this.addedPlatforms++;
    let platform;
    if (this.platformPool.getLength()) {
      platform = this.platformPool.getFirst();
      platform.x = posX;
      platform.y = posY;
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
      let newRatio = platformWidth / platform.displayWidth;
      platform.displayWidth = platformWidth;
      platform.tileScaleX = 1 / platform.scaleX;
    } else {
      platform = this.add.tileSprite(posX, posY, platformWidth, 32, "platform");
      this.physics.add.existing(platform);
      platform.body.setImmovable(true);
      platform.body.setVelocityX(
        Phaser.Math.Between(
          gameOptions.platformSpeedRange[0],
          gameOptions.platformSpeedRange[1]
        ) * -1
      );
      this.platformGroup.add(platform);
    }
    this.nextPlatformDistance = Phaser.Math.Between(
      gameOptions.spawnRange[0],
      gameOptions.spawnRange[1]
    );

    // is there a coin over the platform?
    if (this.addedPlatforms > 1) {
      if (Phaser.Math.Between(1, 100) <= gameOptions.coinPercent) {
        if (this.coinPool.getLength()) {
          let coin = this.coinPool.getFirst();
          coin.x = posX;
          coin.y = posY - 100;
          coin.alpha = 1;
          coin.active = true;
          coin.visible = true;
          this.coinPool.remove(coin);
        } else {
          let coin = this.physics.add.sprite(posX, posY - 100, "coin");
          coin.setImmovable(true);
          coin.setVelocityX(platform.body.velocity.x);
          coin.anims.play("rotate");
          this.coinGroup.add(coin);
        }
      }
    }
  }

  // the player jumps when on the ground, or once in the air as long as there are jumps left and the first jump was on the ground
  jump() {
    if (
      this.player.body.touching.down ||
      (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps)
    ) {
      if (this.player.body.touching.down) {
        this.playerJumps = 0;
      }
      this.player.setVelocityY(gameOptions.jumpForce * -1);
      this.playerJumps++;

      // stops animation
      this.player.anims.stop();
    }
  }
  update() {
    if (Phaser.Input.Keyboard.JustDown(spaceBar) ) {
        this.jump()
    }
    // this.game over
    if (this.player.y > this.game.config.height) {
      this.scene.start("End");
      console.log(Score.get());
    }
    this.player.x = gameOptions.playerStartPosition;

    // recycling platforms
    let minDistance = this.game.config.width;
    let rightmostPlatformHeight = 0;
    this.platformGroup.getChildren().forEach(function(platform) {
      let platformDistance =
        this.game.config.width - platform.x - platform.displayWidth / 2;
      if (platformDistance < minDistance) {
        minDistance = platformDistance;
        rightmostPlatformHeight = platform.y;
      }
      if (platform.x < -platform.displayWidth / 2) {
        this.platformGroup.killAndHide(platform);
        this.platformGroup.remove(platform);
      }
    }, this);

    // recycling coins
    this.coinGroup.getChildren().forEach(function(coin) {
      if (coin.x < -coin.displayWidth / 2) {
        this.coinGroup.killAndHide(coin);
        this.coinGroup.remove(coin);
      }
    }, this);

    // adding new platforms
    if (minDistance > this.nextPlatformDistance) {
      let nextPlatformWidth = Phaser.Math.Between(
        gameOptions.platformSizeRange[0],
        gameOptions.platformSizeRange[1]
      );
      let platformRandomHeight =
        gameOptions.platformHeighScale *
        Phaser.Math.Between(
          gameOptions.platformHeightRange[0],
          gameOptions.platformHeightRange[1]
        );
      let nextPlatformGap = rightmostPlatformHeight + platformRandomHeight;
      let minPlatformHeight =
        this.game.config.height * gameOptions.platformVerticalLimit[0];
      let maxPlatformHeight =
        this.game.config.height * gameOptions.platformVerticalLimit[1];
      let nextPlatformHeight = Phaser.Math.Clamp(
        nextPlatformGap,
        minPlatformHeight,
        maxPlatformHeight
      );
      this.addPlatform(
        nextPlatformWidth,
        this.game.config.width + nextPlatformWidth / 2,
        nextPlatformHeight
      );
    }
  }
}