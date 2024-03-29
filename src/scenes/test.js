import * as Phaser from "../lib/phaser.min";
import celerx from "../lib/celerx";
import seed from "seed-random";
import * as Player from "../objects/player";
import * as Droplet from "../objects/droplet";
//  scene
export default class test extends Phaser.Scene {
  constructor() {
    super("Test");
  }

  preload() {
    this.load.image("platform", require("../assets/platform.png"));
    this.load.image("playButton", require("../assets/play3.png"));
    this.load.image("background", require("../assets/concrete.png"));
    Player.load(this);
    Droplet.load(this);
  }
  create() {

    var match = celerx.getMatch();
    seed(match && match.sharedRandomSeed, { global: true });
    celerx.start();
    
    Player.init(this);
    Droplet.init(this);

  }
}