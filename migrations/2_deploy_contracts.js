//const ConvertLib = artifacts.require("ConvertLib");
//const MetaCoin = artifacts.require("MetaCoin");
//const Voting = artifacts.require("Voting.sol");
const test = artifacts.require("test.sol");

module.exports = function(deployer) {
  //deployer.deploy(ConvertLib);
  //deployer.link(ConvertLib, MetaCoin);
  //deployer.deploy(MetaCoin);
  //deployer.deploy(Voting, ['A', 'B']);//error,注意，要使用16进制 bytes32
  // deployer.deploy(Voting, 
  //   ["0x4100000000000000000000000000000000000000000000000000000000000000",
  //   "0x4200000000000000000000000000000000000000000000000000000000000000"]);
  deployer.deploy(test);
};
