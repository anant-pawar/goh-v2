import * as Phaser from "../lib/phaser.min";
import * as Score from "../service/score";

import celerx from "../lib/celerx";

//  scene
export default class menu extends Phaser.Scene {
  constructor() {
    super("End");
  }

  playGame() {
    this.scene.start("PlayGame");
  }

  create() {
    const play = this.add
    .image(
      this.sys.canvas.width / 2,
      this.sys.canvas.height / 2,
      "playButton"
    )
    .setInteractive();
    this.add.text(10, 10, 'Score: '+ Score.get(), 
    { fontSize: '32px', fill: '#fff', fontFamily: 'Comic Sans MS' });    
      
    celerx.submitScore(Score.get());
    
    play.once("pointerup", this.playGame, this);
  }
}