const Web3 = require('web3')
const testArtifact = require('../../build/contracts/test.json')
const Bmob = require("hydrogen-js-sdk");
const rpcURL = "https://ropsten.infura.io/v3/ec5b7d7541a34823a3f12797e9b017ad"
const web3 = new Web3(rpcURL)
//
//var web3 = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
const abi = testArtifact.abi
const address = "0x0Fa852319205C0969718Ff02A0856036c90b87A4";
const contract = new web3.eth.Contract(abi, address)


contract.events.SendparBal({
    filter: {},
    fromBlock: 0
  }, function (error, result) { })
    .on("data", function (result) {
      //console.log(result);
      Bmob.initialize("08638e06c054fbdc", "000727");//充值记录保存到bmob云上
      const query = Bmob.Query('sendparBal');
      query.set("username", Bmob.User.current().username)
      query.set("address", result.returnValues.addr)
      query.set("amount", result.returnValues.amount)
      query.set("txhash", result.transactionHash)
      query.save().then(res => {
        console.log(res)
        console.log("已上传到bmob")
        //location.reload();
        return true;
      }).catch(err => {
        console.log(err)
        return false;
      })
    })


