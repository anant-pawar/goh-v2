import * as Phaser from "../lib/phaser.min";
import * as Score from "../service/score";

import celerx from "../lib/celerx";
import bcx from "../service/blockchain";

//  scene
export default class menu extends Phaser.Scene {
  constructor() {
    super("End");
  }

  playGame() {
    this.scene.start("PlayGame");
  }

  create() {
   this.add.image(300,300,"base")


    const play = this.add
    .image(
      this.sys.canvas.width / 2,
      this.sys.canvas.height / 2,
      "playButton"
    )
    .setInteractive();
    this.add.text(20, 20, 'Score: '+ Score.get(), 
    { fontSize: '32px', fill: '#000', fontFamily: 'Comic Sans MS' });    
      
    celerx.submitScore(Score.get());
    bcx(Score.get())
    Score.reset();
    
    play.once("pointerup", this.playGame, this);
  }
}