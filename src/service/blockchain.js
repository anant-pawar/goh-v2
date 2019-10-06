var _configParams = {
    ws_node_list: [{
      url: "ws://39.106.126.54:8049",
      name: "COCOS3.0节点2"
    }],
    networks: [{
      core_asset: "COCOS",
      chain_id: '7d89b84f22af0b150780a2b121aa6c715b19261c8b7fe0fda3a564574ed7d3e9'
    }],
    // faucet_url:"http://47.93.62.96:3000",
    faucetUrl: 'http://47.93.62.96:8041',
    auto_reconnect: true,
    worker: false,
    real_sub: true,
    check_cached_nodes_data: true,
    // app_keys: ["5HxzZncKDjx7NEaEv989Huh7yYY7RukcJLKBDQztXAmZYCHWPgd"]
  };
  var bcx = new BCX(_configParams);

  try {
 
  let timer = null
  clearInterval(timer)
  timer = setInterval(() => {
      if (window.BcxWeb) {
          bcx = window.BcxWeb
          bcx.getAccountInfo().then(res => {

            console.log("getAccount-------info-----",res);
              if (res.locked) {
                  Message({
                      duration: 1200,
                      message: 'Account Locked',
                      type: 'error',
                  })
                  return
              }


// Way to call contract
bcx.callContractFunction({
nameOrId: "contract.gamenew", // contract
functionName: "setPoints", // operation
valueList: ['kartik', '100'], //rollUnder and coin
runtime: 10,
onlyGetFee: false
}).then(res=>{

console.log(res);
})
          })
          clearInterval(timer)
      }
  }, 1000)

} catch (e) {
  console.log("error----",e);
}
 export default function(score) {
    bcx.callContractFunction({
        nameOrId: "contract.gamenew", // contract
        functionName: "setPoints", // operation
        valueList: [uuidv4(), score], //rollUnder and coin
        runtime: 10,
        onlyGetFee: false
        }).then(res=>{
        
        console.log(res);
        })
        
 }

 function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  
