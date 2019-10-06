import * as Phaser from "../lib/phaser.min";
//  scene
export default class menu extends Phaser.Scene {
  constructor() {
    super("Menu");
  }

  playGame() {
    this.scene.start("PlayGame");
  }

  create() {
    this.input.mouse.disableContextMenu();
    
    const play = this.add
    .image(
      this.sys.canvas.width / 2,
      this.sys.canvas.height / 2,
      "playButton"
    )
    .setInteractive();

    play.once("pointerup", this.playGame, this);
  }
}