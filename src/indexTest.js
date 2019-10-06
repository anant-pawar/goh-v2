import * as Phaser from "./lib/phaser.min";
import celerx from "./lib/celerx";
import seed from "seed-random";

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    disableContextMenu: true,
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload ()
{
   // this.load.spritesheet('balls', 'assets/sprites/balls.png', { frameWidth: 17, frameHeight: 17 });
}

function create ()
{
    this.input.mouse.disableContextMenu();

    var match = celerx.getMatch();
    seed(match && match.sharedRandomSeed, { global: true });
    celerx.start();

    this.input.on('pointerdown', function (pointer) {

        var score = Math.round(Math.random() * 100);
        //console.log(score);
        celerx.submitScore(score);

    }, this);
}
