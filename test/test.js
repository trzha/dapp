//执行定义变量来表示不同的合约
const Test  = artifacts.require('test.sol');
//执行变量，便于进行更改
const var_a = 'hello';
const var_b = 'Hello World';
//执行定义合约中的其他操作
contract('test',accounts => {
    before(async () => {
    //构建合约(可以设置两种方式)
    //01
    let a = await Test.deployed();
    //02
    //let Contract_Ches       = await Ches.new(var_a);
    await a.sendparBal('0x48F5CCBeA8450092A6F581b13e69f9CDC15597f4', 521);
    let f = await a.getParBal('0x48F5CCBeA8450092A6F581b13e69f9CDC15597f4')
    console.log("合约地址:",a.address);
    console.log("父母余额：",f)
    // //在原有的合约上进行获取
    // let g = await Ches.at('0xdd7b7Ba15Ab91621311C71728b411A5D8adF89C7');
    // let h = await g.greets();
    // let i = await g.setGreeting('您好，世界！');
    // let k = await g.greets();
    // console.log("合约地址:",a.address);
    // console.log("获取原数据:",c);
    // console.log("获取新数据:",f);
    // console.log("获取原来的合约地址:",g.address);
    // console.log("获取原来的合约值:",h);
    // console.log("更改原来合约的值，并且显示出来:",k);
    //console.log("02合约地址:",Contract_Ches.address);
    });
    it('Check whether the contract has been issued successfully', async () => {
      console.log("测试合约的操作:");
    }); 
});