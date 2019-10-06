import * as Phaser from "../lib/phaser.min";
import * as Player from "../objects/player";
import * as Droplet from "../objects/droplet";
import celerx from "../lib/celerx";
import seed from "seed-random";

// preloadGame scene
export default class preloadGame extends Phaser.Scene {
  constructor() {
    super("PreloadGame");
  }
  preload() {
    this.load.image("platform", require("../assets/platform.png"));
    this.load.image("playButton", require("../assets/play3.png"));
     this.load.image("background", require("../assets/storyboard.png"));
     this.load.image("base", require("../assets/base.png"));
     this.load.audio("theme", ['../assets/aud.ogg', '../assets/aud.mp3'])

    Player.load(this);
    Droplet.load(this);

  }
  create() {
    var match = celerx.getMatch();
    seed(match && match.sharedRandomSeed, { global: true });
    celerx.start();
    

   // var music = this.sound.add('theme');
    //music.play();

    Player.init(this);
    Droplet.init(this);


    this.scene.start("Menu");
  }
}