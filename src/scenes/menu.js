import * as Phaser from "../lib/phaser.min";
//  scene
export default class menu extends Phaser.Scene {
  constructor() {
    super("Menu");
  }

  playGame() {
    this.scene.start("PlayGame");
    

// for coscobcx but doesn't do anything

// var bcx=new BCX({
//   default_ws_node:'' ,
//   ws_node_list:[{url:"ws://47.93.62.96:8049",name:"node blah blah"}], //API server node list, required
//   faucet_url:"http://47.93.62.96:8041", //Registration
//   networks:[{
//     core_asset:"COCOS",
//     chain_id:"7d89b84f22af0b150780a2b121aa6c715b19261c8b7fe0fda3a564574ed7d3e9" 
//   }], 
//   auto_reconnect:false,//Whether to connect automatically when RPC is disconnected, the default is true
//   app_keys:["5HxzZncKDjx7NEaEv989Huh7yYY7RukcJLKBDQztXAmZYCHWPgd"]//Contract authorization. Do not need to configure this if there is no contract authorization.
// });



// console.log("------init---------")
  // bcx.transferAsset({
  //     fromAccount: 'test1',
  //     toAccount: 'test2',
  //     amount: amount,
  //     assetId: 'COCOS',
  //     feeAssetId: 'COCOS',
  //     memo: memo,
  //     onlyGetFee: false,
  // }).then(function (res) {
  //      console.log('transferAsset res',res);
  // })

// end of for coscobcx but doesn't do anything


    
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