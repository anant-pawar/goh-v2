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
   this.add.image(300,300,"base")

    this.input.mouse.disableContextMenu();
/*
    this.add.text(  (this.game.config.width / 2) -80,  20, 'Gattimann', 
    { fontSize: '32px', fill: '#000', fontFamily: 'Comic Sans MS' });    
  */  
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