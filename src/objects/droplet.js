export function load(game) {
  game.load.spritesheet("coin", require("../assets/water.png"), {
    frameWidth: 25,
    frameHeight: 25
  });
}

export function init(game) {
  game.anims.create({
    key: "rotate",
    frames: game.anims.generateFrameNumbers("coin", {
      start: 0,
      end: 1
    }),
    frameRate: 15,
    yoyo: true,

    repeat: -1
  });
}
