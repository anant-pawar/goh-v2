import * as Phaser from "./lib/phaser.min";
import celerx from "./lib/celerx";
import seed from "seed-random";

import Preload from "./scenes/preload";
import Menu from "./scenes/menu";
import Play from "./scenes/game";
import Test from "./scenes/test";
import End from "./scenes/end";
//let game;

var  gameConfig =  {
  type: Phaser.AUTO,
  parent: 'GOH',
  width: 600,
  height: 400,
  disableContextMenu: true,
  scene: [Preload, Menu, Play, End],
  backgroundColor: 0x0c88c7,


  // physics settings
  physics: {
    default: "arcade"
  }
};

var game = new Phaser.Game(gameConfig);
/*
function run() {
  // object containing configuration options
  let gameConfig = {
    type: Phaser.CANVAS,
    width: 600,
    height: 400,
    scene: [ Preload, Menu, Play, End],
    backgroundColor: 0x0c88c7,


    // physics settings
    physics: {
      default: "arcade"
    }
  };
  game = new Phaser.Game(gameConfig);
//  window.focus();
 // resize();
 // window.addEventListener("resize", resize, false);
}*/
/*
function resize() {
  let canvas = document.querySelector("canvas");
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;
  let windowRatio = windowWidth / windowHeight;
  let gameRatio = game.config.width / game.config.height;
  if (windowRatio < gameRatio) {
    canvas.style.width = windowWidth + "px";
    canvas.style.height = windowWidth / gameRatio + "px";
  } else {
    canvas.style.width = windowHeight * gameRatio + "px";
    canvas.style.height = windowHeight + "px";
  }
}
*/
//run();

