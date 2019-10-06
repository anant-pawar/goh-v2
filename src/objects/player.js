export function load (game) {
  game.load.spritesheet("player", require("../assets/character.png"), {
    frameWidth: 32,
    frameHeight: 48
  });
}

export function init (game) {
    game.anims.create({
      key: "run",
      frames: game.anims.generateFrameNumbers("player", {
        start: 5,
        end: 8
      }),
      frameRate: 15,
      repeat: -1
    });
}

