export function load (game) {
 game.load.spritesheet("player", require("../assets/hero.png"), {
    frameWidth: 50,
    frameHeight: 48
  });
}

export function init (game) {
    game.anims.create({
      key: "run",
      frames: game.anims.generateFrameNumbers("player", {
        start: 0,
        end: 5,
      }),
      frameRate: 15,
      repeat: -1
    });
}

