export function load(game) {
  game.load.spritesheet("coin", require("../assets/coin.png"), {
    frameWidth: 20,
    frameHeight: 20
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
