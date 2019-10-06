export function load (game) {
 game.load.spritesheet("player", require("../assets/girl.png"), {
    frameWidth: 120,
    frameHeight: 120
  });
}

export function init (game) {
    game.anims.create({
      key: "run",
      frames: game.anims.generateFrameNumbers("player", {
        start: 0,
        end: 3,
      }),
      frameRate: 15,
      repeat: -1
    });
}

