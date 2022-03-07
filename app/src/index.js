import Web3 from 'web3';
import testArtifact from '../../build/contracts/test.json'
import Bmob from "hydrogen-js-sdk";
import ipfsAPI from 'ipfs-api'
const ipfs = ipfsAPI({
  host: 'ipfs.infura.io',
  port: '5001',
  protocol: 'https'
});

const logo = require('!file-loader?limit=102400!./static/picture/1.jpeg').default;
//import './static/css/css.css'
//require("!style-loader!css-loader!./static/css/css.css");
require('!style-loader!css-loader!./static/css/bootstrap.min.css')
require('!style-loader!css-loader!./static/css/landerapp.min.css')
//require('!style-loader!css-loader!./static/css/pages.min.css')
//require('!style-loader!css-loader!./static/css/rtl.min.css')
require('!style-loader!css-loader!./static/css/themes.min.css')
require('!style-loader!css-loader!./static/css/subscribe.css')
//require('!style-loader!css-loader!./static/css/login.css')
//require('!url-loader./static/picture/1.jpeg')

// require('!style-loader!css-loader!./static/css/widgets.min.css')

// import "./static/css/css.css";
// import "./static/css/bootstrap.min.css";
// import "./static/css/landerapp.min.css";
// import "./static/css/pages.min.css";
// import "./static/css/rtl.min.css";
// import "./static/css/themes.min.css";


const App = {
  web3: null,
  account: null,//当前账户
  paccount: null,//父母账户
  taccount: null,//孩子账户
  saccount: null,//商家账户
  bal: null,//当前账户余额
  test: null, //测试合约
  tt: null,//定时器
  ss: null,//
  pp: null,
  flagday: null,//这周是否发过钱
  buffer: null,

  captureFile: function () {//加载图片buffer
    var reader;
    const file = document.getElementById("goodsImage").files[0];
    reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    console.log(reader);
    reader.onloadend = () => {
      console.log("buffer", Buffer.from(reader.result));
      App.buffer = Buffer.from(reader.result)
    }
  },

  //https://ipfs.infura.io/ipfs/这里复制哈希
  upImageOnIpfs: async function () {//上传图片到ipfs
    return new Promise(function (resolve, reject) {
      ipfs.add(App.buffer)
        .then((response) => { //response为ipfs返回的hash，即文件所存储的位置
          console.log(response)
          resolve(response[0].hash);
          console.log(response[0].hash);
          return response[0].hash;
        }).catch((err) => {
          console.error(err)
          reject(err);
        })
    })
  },

  start: async function () {

    const { web3 } = this;

    try {
      //document.getElementById("main-menu-toggle").src = logo;
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = testArtifact.networks[networkId];
      this.test = new web3.eth.Contract(
        testArtifact.abi,
        deployedNetwork.address,
      );
      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];
      this.paccount = accounts[0];
      this.taccount = accounts[1];
      this.saccount = accounts[2];
      console.log(accounts[0].toString());
      console.log(accounts);
      // console.log(accounts[2].toString());
      this.bal = await web3.eth.getBalance(accounts[0].toString());
      console.log("will ready +++++++ ");
      this.ready();
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },

  // refresh: async function(IdofparentBal, IdofteenBal, IdofteenLim, IdofsellerMoney, addr) {
  //   try{
  //   const { getParBal, getTeenBal, getTeenLim, getSellerMoney, getIsBuy, getPriceGoods } = this.test.methods;
  //   const parBal = await getParBal(addr).call();
  //   const TeenBal = await getTeenBal(addr).call();
  //   const TeenLim = await getTeenLim(addr).call();
  //   const SellerMoney = await getSellerMoney(addr).call();
  //   document.getElementById(IdofparentBal).innerHTML = parBal.toString();;
  //   document.getElementById(IdofteenBal).innerHTML = TeenBal.toString();;
  //   document.getElementById(IdofteenLim).innerHTML = TeenLim.toString();;
  //   document.getElementById(IdofsellerMoney).innerHTML = SellerMoney.toString();;
  //   }catch(err){
  //     console.log("refresh出错");
  //     console.log(err);
  //   }
  // },

  refreshp: async function (IdofparentBal, IdofteenBal, IdofteenLim, IdofteenSale, IdofsellerMoney, addr) {
    try {
      const { getParBal, getTeenBal, getTeenLim, getTeenSale, getSellerMoney, getIsBuy, getPriceGoods, getprecetaddr, getprecemoney } = this.test.methods;
      const parBal = await getParBal(addr).call();
      const precetaddr = await getprecetaddr(addr).call();
      const precemoney = await getprecemoney(addr).call();
      // const TeenBal = await getTeenBal(addr).call();
      // const TeenLim = await getTeenLim(addr).call();
      // const SellerMoney = await getSellerMoney(addr).call();
      document.getElementById(IdofparentBal).innerHTML = parBal.toString();;
      document.getElementById("teenAddr8").innerHTML = precetaddr.toString();;
      document.getElementById("teenAmount5").innerHTML = precemoney.toString();;
      document.getElementById("parAddr4").innerHTML = addr;;
      // document.getElementById(IdofteenBal).innerHTML = TeenBal.toString();;
      // document.getElementById(IdofteenLim).innerHTML = TeenLim.toString();;
      // document.getElementById(IdofsellerMoney).innerHTML = SellerMoney.toString();;
    } catch (err) {
      console.log("refreshp出错");
      console.log(err);
    }
  },

  refresht: async function (IdofparentBal, IdofteenBal, IdofteenLim, IdofteenSale, IdofsellerMoney, addr) {
    try {
      const { getParBal, getTeenBal, getTeenLim, getTeenSale, getSellerMoney, getIsBuy, getPriceGoods } = this.test.methods;
      // const parBal = await getParBal(addr).call();
      const TeenBal = await getTeenBal(addr).call();
      const TeenLim = await getTeenLim(addr).call();
      // const TeenSale = await getTeenSale(addr)
      // const SellerMoney = await getSellerMoney(addr).call();
      // document.getElementById(IdofparentBal).innerHTML = parBal.toString();;
      document.getElementById(IdofteenBal).innerHTML = TeenBal.toString();;
      document.getElementById(IdofteenLim).innerHTML = TeenLim.toString();;
      // document.getElementById(IdofsellerMoney).innerHTML = SellerMoney.toString();;

    } catch (err) {
      console.log("refresht出错");
      console.log(err);
    }
  },

  refreshs: async function (IdofparentBal, IdofteenBal, IdofteenLim, IdofteenSale, IdofsellerMoney, addr) {
    try {
      const { getParBal, getTeenBal, getTeenLim, getTeenSale, getSellerMoney, getIsBuy, getPriceGoods } = this.test.methods;
      // const parBal = await getParBal(addr).call();
      // const TeenBal = await getTeenBal(addr).call();
      // const TeenLim = await getTeenLim(addr).call();
      const SellerMoney = await getSellerMoney(addr).call();
      // document.getElementById(IdofparentBal).innerHTML = parBal.toString();;
      // document.getElementById(IdofteenBal).innerHTML = TeenBal.toString();;
      // document.getElementById(IdofteenLim).innerHTML = TeenLim.toString();;
      document.getElementById(IdofsellerMoney).innerHTML = SellerMoney.toString();;
    } catch (err) {
      console.log("refreshs出错");
      console.log(err);
    }
  },

  ready: async function () {

    try {
      // const buffer1 = Buffer.from('this is a demo')
      // ipfs.add(buffer1)
      //     .then( rsp => console.log(rsp[0].hash))
      // .catch(err => console.error(err))
      // document.getElementById("main-menu-toggle").src=logo;
      // Bmob.initialize("08638e06c054fbdc", "000727");
      this.refreshp("parentBal", "teenBal", "teenLim", "teenSale", "sellerMoney", this.account);
      this.refresht("parentBal", "teenBal", "teenLim", "teenSale", "sellerMoney", this.account);
      this.refreshs("parentBal", "teenBal", "teenLim", "teenSale", "sellerMoney", this.account);

      setInterval(async function () {//注意这里的this是window
        // 检查账户是否切换
        const accounts = await App.web3.eth.getAccounts();
        if (accounts[0] != App.account) {
          App.account = accounts[0];
          // 调用一些方法来更新界面
          this.refreshp("parentBal", "teenBal", "teenLim", "teenSale", "sellerMoney", this.account);
          this.refresht("parentBal", "teenBal", "teenLim", "teenSale", "sellerMoney", this.account);
          this.refreshs("parentBal", "teenBal", "teenLim", "teenSale", "sellerMoney", this.account);//注意App应该加上
          console.log("已自动更新！！");
        }

      }, 100);

      Bmob.initialize("08638e06c054fbdc", "000727");
      let current = Bmob.User.current();
      if (current.username != null) {
        //根据id获取超链接,设置href属性
        var aObj = document.getElementById("aaa");
        aObj.href = "index.html";
        //根据id获取超链接,设置文字内容
        aObj.innerText = current.username;

        //根据id获取超链接,设置href属性
        var aObj = document.getElementById("aaa2");
        aObj.href = "login.html";
        //根据id获取超链接,设置文字内容
        aObj.innerText = "退出登陆";
      }


    } catch (err) {
      console.log("ready出错!!!!");
      console.log(err);
    }
  },


  sendparBal: async function () {//给父母发钱
    try {
      const { sendparBal } = this.test.methods;
      //const parAddr2 = document.getElementById("parAddr2").value;
      const parAddr2 = this.account;
      const parAmount = document.getElementById("parAmount").value;
      const parBal_old = await this.test.methods.getParBal(parAddr2).call();
      const success = await sendparBal(parAddr2, parAmount).send({ from: this.account });//这里的返回值不是return的值
      const parBal_new = await this.test.methods.getParBal(parAddr2).call();
      //console.log(parBal1 + "     " + parBal2 + "    " + parAmount);
      const result = parseInt(parBal_old) + parseInt(parAmount);
      console.log(result);
      if (result == parBal_new) {
        alert("发送成功！！！");
      } else {
        alert("发送失败！！！");
      }


      //this.refresh("parentBal", "teenBal", "teenLim", "sellerMoney", this.account);
      this.test.events.SendparBal({
        filter: {},
        fromBlock: 0
      }, function (error, result) { })
        .on("data", function (result) {
          console.log(result);
          Bmob.initialize("08638e06c054fbdc", "000727");//充值记录保存到bmob云上
          const query = Bmob.Query('sendparBal');
          query.set("username", Bmob.User.current().username)
          query.set("address", result.returnValues.addr)
          query.set("amount", result.returnValues.amount)
          query.save().then(res => {
            console.log(res)
            alert("已上传到bmob")
            location.reload();
            return true;
          }).catch(err => {
            console.log(err)
            return false;
          })
        })
        .on("error", console.log(error));
    } catch (err) {
      console.log("sendparBal出错");
      console.log(err);
    }
  },

  sendteenBal: async function () {//父母给孩子发钱
    try {
      const { sendteenBal } = this.test.methods;
      const teenAddr3 = document.getElementById("teenAddr3").value;
      const teenAmount = document.getElementById("teenAmount").value;
      const TeenBal_old = await this.test.methods.getTeenBal(teenAddr3).call();
      await sendteenBal(teenAddr3, teenAmount).send({ from: this.account });
      const TeenBal_new = await this.test.methods.getTeenBal(teenAddr3).call();
      if ((parseInt(TeenBal_old) + parseInt(teenAmount)) == TeenBal_new) {
        alert("发送成功！！！");
      } else {
        alert("发送失败！！！");
      }

      this.test.events.SendteenBal({
        filter: {},
        fromBlock: 0
      }, function (error, result) { })
        .on("data", function (result) {
          console.log(result);
          Bmob.initialize("08638e06c054fbdc", "000727");//充值记录保存到bmob云上
          const query = Bmob.Query('sendteenBal');
          query.set("username", Bmob.User.current().username)
          query.set("paddr", result.returnValues.addr)
          query.set("taddr", result.returnValues.receiver)
          query.set("amount", result.returnValues.amount)
          query.save().then(res => {
            console.log(res)
            alert("已上传到bmob")
            location.reload();
            return true;
          }).catch(err => {
            console.log(err)
            return false;
          })
        })
        .on("error", console.log(error));
      this.refresh("parentBal", "teenBal", "teenLim", "sellerMoney", this.account);
    } catch (err) {
      console.log("sendteenBal出错");
      console.log(err);
    }
  },

  setLim: async function () {//父母设置零用钱使用范围
    try {
      const { setLim } = this.test.methods;
      const teenAddr4 = document.getElementById("teenAddr4").value;
      const teenMaxAmount = document.getElementById("teenMaxAmount").value;
      //console.log(isBuy2);
      await setLim(teenAddr4, teenMaxAmount).send({ from: this.account });

      this.test.events.SetLim({
        filter: {},
        fromBlock: 0
      }, function (error, result) { })
        .on("data", function (result) {
          console.log(result);
          Bmob.initialize("08638e06c054fbdc", "000727");//设置记录保存到bmob云上
          const query = Bmob.Query('setLim');
          query.set("username", Bmob.User.current().username)
          query.set("paddr", result.returnValues.addr)
          query.set("taddr", result.returnValues.receiver)
          query.set("maxAmount", result.returnValues.maxAmount)
          query.save().then(res => {
            console.log(res)
            alert("已上传到bmob")
            location.reload();
            return true;
          }).catch(err => {
            console.log(err)
            return false;
          })
        })
        .on("error", console.log(error));

      this.refresh("parentBal", "teenBal", "teenLim", "sellerMoney", this.account);
    } catch (err) {
      console.log("setLim出错");
      console.log(err);
    }
  },

  setGoods: async function () {//商家上架商品

    try {
      // document.getElementById("goodsImage").change(function(event){
      //   const file = event.target.files[0];
      //   reader = new window.FileReader();
      //   reader.readAsArrayBuffer(file);
      //   console.log(reader.result);
      // });

      // var reader;
      // const file = document.getElementById("goodsImage").files[0];
      // reader = new window.FileReader();
      // reader.readAsArrayBuffer(file);
      // console.log(reader);
      const h = await App.upImageOnIpfs();
      console.log("图片已经上传到ipfs，hash为" + h);

      const { setGoods } = this.test.methods;
      const goodsId4 = document.getElementById("goodsId4").value;
      const priceGoods2 = document.getElementById("priceGoods2").value;
      const avaGoods = document.getElementById("avaGoods").value;
      const isBuy2 = document.getElementById("isBuy2").value;
      //console.log(isBuy2);
      await setGoods(goodsId4, priceGoods2, avaGoods, isBuy2, h).send({ from: this.account });


      this.test.events.SetGoods({
        filter: {},
        fromBlock: 0
      }, function (error, result) { })
        .on("data", function (result) {
          console.log(result);
          Bmob.initialize("ebc51daf45217ea1", "000727");//上架商品记录保存到bmob云上
          const query = Bmob.Query('setGoods');
          query.set("username", Bmob.User.current().username)
          query.set("address", result.returnValues.addr)
          query.set("goodsId", result.returnValues.id)
          query.set("priceGoods", result.returnValues.price)
          query.set("avaGoods", result.returnValues.ava)
          query.set("isBuy", result.returnValues.isTeen)
          query.set("hash", result.returnValues.hash)
          query.save().then(res => {
            console.log(res)
            alert("已上传到bmob")
            location.reload();
          }).catch(err => {
            console.log(err)
          })
        })
        .on("error", console.log(error));
      //this.refresh("parentBal", "teenBal", "teenLim", "sellerMoney", this.account);
    } catch (err) {
      console.log("setGoods出错");
      console.log(err);
    }
  },

  getPriceGoods: async function () {//查询商家某商品的价格
    try {
      const { getPriceGoods } = this.test.methods;
      const sellerAddr3 = document.getElementById("sellerAddr3").value;
      const goodsId2 = document.getElementById("goodsId2").value;
      const priceGoods1 = await getPriceGoods(sellerAddr3, goodsId2).call();
      document.getElementById("priceGoods1").innerHTML = priceGoods1.toString();;
    } catch (err) {
      console.log("getPriceGoods出错");
      console.log(err);
    }
  },

  getTeen: async function () {//父母查询青少年信息
    try {
      let current = Bmob.User.current();
      console.log(current);
      if (current != null) {
        const { getTeenBal, getTeenLim, getTeenSale } = this.test.methods;
        const teenAddr5 = document.getElementById("teenAddr5").value;
        const teenBal = await getTeenBal(teenAddr5).call();
        const teenLim = await getTeenLim(teenAddr5).call();
        const teenSale = await getTeenSale(teenAddr5).call();
        //console.log(teenLim);
        document.getElementById("teenBal").innerHTML = teenBal.toString();;
        document.getElementById("teenLim").innerHTML = teenLim.toString();;
        document.getElementById("teenSale").innerHTML = teenSale.toString();;
      } else {
        alert("请先登陆");
      }
    } catch (err) {
      console.log("getTeenLim出错");
      console.log(err);
    }
  },

  getIsBuy: async function () {//查询青少年是否可以买某一商户的某一商品
    try {
      const { getIsBuy } = this.test.methods;
      const sellerAddr1 = document.getElementById("sellerAddr1").value;
      const goodsId1 = document.getElementById("goodsId1").value;
      const isBuy1 = await getIsBuy(sellerAddr1, goodsId1).call();
      console.log(isBuy1);
      document.getElementById("isBuy1").innerHTML = isBuy1;;
    } catch (err) {
      console.log("getIsBuy出错");
      console.log(err);
    }
  },



  buy: async function () {//青少年买商品
    try {
      const { buy } = this.test.methods;
      const sellerAddr4 = document.getElementById("sellerAddr4").value;
      const goodsId3 = document.getElementById("goodsId3").value;
      const buyNum = document.getElementById("buyNum").value;
      await buy(sellerAddr4, goodsId3, buyNum).send({ from: this.account });
      console.log("+1")
      this.test.events.Buy({
        filter: {},
        fromBlock: 0
      }, function (error, result) { })
        .on("data", function (result) {
          console.log(result);
          Bmob.initialize("c10761a122fca01d", "000727");//购买记录保存到bmob云上
          const query = Bmob.Query('Buy');
          query.set("username", Bmob.User.current().username)
          query.set("addr", result.returnValues.addr)
          query.set("seller", result.returnValues.seller)
          query.set("goodsid", result.returnValues.id)
          query.set("num", result.returnValues.num)
          query.save().then(res => {
            console.log(res)
            alert("已上传到bmob")
            location.reload();
          }).catch(err => {
            console.log(err)
          })

        })
        .on("error", console.log(error));
      //this.refresh("parentBal", "teenBal", "teenLim", "sellerMoney", this.account);
    } catch (err) {
      console.log("buy出错");
      console.log(err);
    }
  },




  getallGoods: async function () {//查询某一商家某一商品信息
    try {
      let { getPriceGoods, getAvaGoods, getSaleGoods, getimgGoods, getIsBuy } = this.test.methods;
      const sellerAddr5 = document.getElementById("sellerAddr5").value;
      const goodsId5 = document.getElementById("goodsId5").value;
      var priceGoods, avaGoods, saleGoods, hash, IsBuy;
      priceGoods = await getPriceGoods(sellerAddr5, goodsId5).call();
      avaGoods = await getAvaGoods(sellerAddr5, goodsId5).call();
      saleGoods = await getSaleGoods(sellerAddr5, goodsId5).call();
      hash = await getimgGoods(sellerAddr5, goodsId5).call();
      IsBuy = await getIsBuy(sellerAddr5, goodsId5).call();
      //document.write(goodsId5 + "&nbsp;&nbsp;&nbsp;&nbsp;" + priceGoods + "&nbsp;&nbsp;&nbsp;&nbsp;" + avaGoods + "&nbsp;&nbsp;&nbsp;&nbsp;" + saleGoods + "</br>");
      document.getElementById("priceGoods2").innerHTML = priceGoods;;
      document.getElementById("avaGoods").innerHTML = avaGoods;;
      document.getElementById("saleGoods").innerHTML = saleGoods;;
      document.getElementById("goodsImage2").src = "https://ipfs.infura.io/ipfs/" + hash;;
      document.getElementById("isBuy1").innerHTML = IsBuy;;
      
    } catch (err) {
      console.log("getallGoods出错");
      console.log(err);
    }
  },




  AutosendteenBal: async function () {//自动给孩子发钱
    try {
      var timeInterval = document.getElementById("timeInterval").value * 1000;
      console.log(this.timeInterval);
      const teenAddr6 = document.getElementById("teenAddr6").value;
      const teenAmount2 = document.getElementById("teenAmount2").value;
      const { sendteenBal } = this.test.methods;
      this.tt = window.setInterval(async function () {//注意这里的this是window

        console.log("hhhhhhh");
        // const TeenBal_old = await this.App.test.methods.getTeenBal(teenAddr6).call();
        await sendteenBal(teenAddr6, teenAmount2).send({ from: this.App.account });
        // const TeenBal_new = await this.App.test.methods.getTeenBal(teenAddr6).call();
        // if((parseInt(TeenBal_old) + parseInt(teenAmount2)) == TeenBal_new){
        //   alert("发送成功！！！");
        // }else{
        //   alert("发送失败！！！");
        // }

        this.App.refreshp("parentBal", "teenBal", "teenLim", "teenSale", "sellerMoney", this.App.account);
        this.App.refresht("parentBal", "teenBal", "teenLim", "teenSale", "sellerMoney", this.App.account);
      }, timeInterval);
    } catch (err) {
      console.log("AutosendteenBal出错")
      console.log(err);
    }
  },



  StopsendteenBal: async function () {//停止自动给孩子发钱
    try {
      clearInterval(this.tt);
      alert("已停止");
    } catch (err) {
      console.log("StopsendteenBal出错");
      console.log(err);
    }
  },

  WeeksendteenBal: async function () {//每周自动给孩子发钱
    try {
      const teenAddr7 = document.getElementById("teenAddr7").value;
      const teenAmount3 = document.getElementById("teenAmount3").value;
      const { sendteenBal } = this.test.methods;
      var day = document.getElementById("day").value;
      this.flagday = 0;
      console.log(this.flagday + "hulalal");
      this.ss = setInterval(async function () {//注意这里的this是window
        var myDate = new Date();
        var currentday = myDate.getDay();
        console.log(currentday);
        if (day == currentday && this.App.flagday == 0) {
          alert("准备发送");
          this.App.flagday = 1;
          await sendteenBal(teenAddr7, teenAmount3).send({ from: this.App.account });
          this.App.refreshp("parentBal", "teenBal", "teenLim", "teenSale", "sellerMoney", this.App.account);
          this.App.refresht("parentBal", "teenBal", "teenLim", "teenSale", "sellerMoney", this.App.account);
        }
        if (day != currentday) {
          console.log("未到指定日期");
          this.App.flagday = 0;
        }
      }, 2000);
    } catch (err) {
      console.log("WeeksendteenBal出错");
      console.log(err);
    }
  },

  StopWeeksendteenBal: async function () {//停止自动每周给孩子发钱
    try {
      clearInterval(this.ss);
      alert("已停止");
    } catch (err) {
      console.log("StopsendteenBal出错");
      console.log(err);
    }
  },

  Askpar: async function () {//青少年向父母要钱
    try {
      const { ask } = this.test.methods;
      const parAddr3 = document.getElementById("parAddr3").value;
      const teenAmount4 = document.getElementById("teenAmount4").value;
      //console.log(isBuy2);
      await ask(parAddr3, teenAmount4).send({ from: this.account });
      this.refresh("parentBal", "teenBal", "teenLim", "sellerMoney", this.account);
    } catch (err) {
      console.log("Askpar出错");
      console.log(err);
    }
  },

  parRegister: async function () {//父母注册
    try {
      Bmob.initialize("08638e06c054fbdc", "000727");
      const user2 = document.getElementById("user2").value;
      const pass2 = document.getElementById("pass2").value;
      const email2 = document.getElementById("email2").value;
      const phone2 = document.getElementById("phone2").value;
      let params = {
        username: user2,
        password: pass2,
        email: email2,
        phone: phone2,
      }
      Bmob.User.register(params).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      });
      alert("注册成功");
    } catch (err) {
      console.log("parRegister出错");
      console.log(err);
    }
  },

  teenRegister: async function () {//青少年注册
    try {
      Bmob.initialize("c10761a122fca01d", "000727");
      const user3 = document.getElementById("user3").value;
      const pass3 = document.getElementById("pass3").value;
      const email3 = document.getElementById("email3").value;
      const phone3 = document.getElementById("phone3").value;
      let params = {
        username: user3,
        password: pass3,
        email: email3,
        phone: phone3,
      }
      Bmob.User.register(params).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      });
      alert("注册成功");
    } catch (err) {
      console.log("teenRegister出错");
      console.log(err);
    }
  },

  selRegister: async function () {//商家注册
    try {
      Bmob.initialize("ebc51daf45217ea1", "000727");
      const user5 = document.getElementById("user5").value;
      const pass5 = document.getElementById("pass5").value;
      const email5 = document.getElementById("email5").value;
      const phone5 = document.getElementById("phone5").value;
      let params = {
        username: user5,
        password: pass5,
        email: email5,
        phone: phone5,
      }
      Bmob.User.register(params).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      });
      alert("注册成功");
    } catch (err) {
      console.log("selRegister出错");
      console.log(err);
    }
  },

  parLogin: async function () {//父母登陆
    try {
      const user = document.getElementById("user").value;
      const pass = document.getElementById("pass").value;
      Bmob.initialize("08638e06c054fbdc", "000727");
      Bmob.User.login(user, pass).then(res => {
        console.log(res)
        self.location = "index.html";
      }).catch(err => {
        console.log(err)
      });
    } catch (err) {
      console.log("parLogin出错");
      console.log(err);
    }
  },

  teenLogin: async function () {//青少年登陆
    try {
      const user4 = document.getElementById("user4").value;
      const pass4 = document.getElementById("pass4").value;
      Bmob.initialize("c10761a122fca01d", "000727");
      Bmob.User.login(user4, pass4).then(res => {
        console.log(res)
        self.location = "stat-panels.html";
      }).catch(err => {
        console.log(err)
      });
    } catch (err) {
      console.log("teenLogin出错");
      console.log(err);
    }
  },

  selLogin: async function () {//商家登陆
    try {
      const user6 = document.getElementById("user6").value;
      const pass6 = document.getElementById("pass6").value;
      Bmob.initialize("ebc51daf45217ea1", "000727");
      Bmob.User.login(user6, pass6).then(res => {
        console.log(res)
        self.location = "widgets.html";
      }).catch(err => {
        console.log(err)
      });
    } catch (err) {
      console.log("selLogin出错");
      console.log(err);
    }
  },

  emailVerified: async function () {//邮箱验证
    Bmob.initialize("08638e06c054fbdc", "000727");
    Bmob.User.requestEmailVerify('463084882@qq.com').then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },


  exitLogin: async function () {//退出登陆
    Bmob.User.logout();
  },

  listBuy: async function(){
    Bmob.initialize("c10761a122fca01d", "000727");
    const query = Bmob.Query("Buy");
    query.equalTo("addr", "==", document.getElementById("teenAddr9").value)
    //query.equalTo("username", "==", "lhx")
    query.find().then(res => {
      console.log(res);
      document.write("用户名" + "&nbsp;&nbsp;&nbsp;&nbsp;" + "商家地址" + "&nbsp;&nbsp;&nbsp;&nbsp;" + "商品id" + "&nbsp;&nbsp;&nbsp;&nbsp;" + "购买数量" + "&nbsp;&nbsp;&nbsp;&nbsp;" + "购买时间" + "</br>");
      for(var i = 0; i < res.length ;i++){
        document.write(res[i].username + "&nbsp;&nbsp;&nbsp;&nbsp;" + res[i].seller + "&nbsp;&nbsp;&nbsp;&nbsp;" + res[i].goodsid + "&nbsp;&nbsp;&nbsp;&nbsp;" + res[i].num + "&nbsp;&nbsp;&nbsp;&nbsp;" + res[i].createdAt + "</br>");
      }
    })
  },

  listAllgoods: async function(){
    Bmob.initialize("ebc51daf45217ea1", "000727");
    const query = Bmob.Query("setGoods");
    query.find().then(res => {
      console.log(res);
      for(var i = 0; i < res.length ;i++){
        document.write(res[i].username + "&nbsp;&nbsp;&nbsp;&nbsp;" + res[i].address + "&nbsp;&nbsp;&nbsp;&nbsp;" + res[i].goodsId + "&nbsp;&nbsp;&nbsp;&nbsp;" + res[i].priceGoods + "&nbsp;&nbsp;&nbsp;&nbsp;" + res[i].avaGoods + "&nbsp;&nbsp;&nbsp;&nbsp;" + res[i].isBuy + "&nbsp;&nbsp;&nbsp;&nbsp;" + res[i].hash + "</br>");
      }
    })
  },

  listPricegoods: async function(){
    Bmob.initialize("ebc51daf45217ea1", "000727");
    const query = Bmob.Query("setGoods");
    query.equalTo("priceGoods", ">=", document.getElementById("minprice").value);
    query.equalTo("priceGoods", "<=", document.getElementById("maxprice").value);
    query.find().then(res => {
      console.log(res);
      for(var i = 0; i < res.length ;i++){
        document.write(res[i].username + "&nbsp;&nbsp;&nbsp;&nbsp;" + res[i].address + "&nbsp;&nbsp;&nbsp;&nbsp;" + res[i].goodsId + "&nbsp;&nbsp;&nbsp;&nbsp;" + res[i].priceGoods + "&nbsp;&nbsp;&nbsp;&nbsp;" + res[i].avaGoods + "&nbsp;&nbsp;&nbsp;&nbsp;" + res[i].isBuy + "&nbsp;&nbsp;&nbsp;&nbsp;" + res[i].hash + "</br>");
      }
    })
  },

  listSendparBal: async function(){
    Bmob.initialize("08638e06c054fbdc", "000727");
    const query = Bmob.Query("sendparBal");
    query.find().then(res => {
      console.log(res);
      for(var i = 0; i < res.length ;i++){
        document.write(res[i].username + "&nbsp;&nbsp;&nbsp;&nbsp;" + res[i].address + "&nbsp;&nbsp;&nbsp;&nbsp;" + res[i].amount + "&nbsp;&nbsp;&nbsp;&nbsp;" + res[i].createdAt + "</br>");
      }
    })
  },

  listASendparBal: async function(){
    Bmob.initialize("08638e06c054fbdc", "000727");
    const query = Bmob.Query("sendparBal");
    query.equalTo("address", "==", document.getElementById("parAddr5").value)
    query.find().then(res => {
      console.log(res);
      for(var i = 0; i < res.length ;i++){
        document.write(res[i].username + "&nbsp;&nbsp;&nbsp;&nbsp;" + res[i].address + "&nbsp;&nbsp;&nbsp;&nbsp;" + res[i].amount + "&nbsp;&nbsp;&nbsp;&nbsp;" + res[i].createdAt + "</br>");
      }
    })
  },

  listAllsendteenBal: async function(){
    Bmob.initialize("08638e06c054fbdc", "000727");
    const query = Bmob.Query("sendteenBal");
    query.find().then(res => {
      console.log(res);
      for(var i = 0; i < res.length ;i++){
        document.write(res[i].username + "&nbsp;&nbsp;&nbsp;&nbsp;" + res[i].paddr + "&nbsp;&nbsp;&nbsp;&nbsp;" + res[i].taddr + "&nbsp;&nbsp;&nbsp;&nbsp;" + res[i].amount + "&nbsp;&nbsp;&nbsp;&nbsp;" + res[i].createdAt + "</br>");
      }
    })
  },

  listAsendteenBal: async function(){
    Bmob.initialize("08638e06c054fbdc", "000727");
    const query = Bmob.Query("sendteenBal");
    query.equalTo("paddr", "==", document.getElementById("parAddr6").value)
    query.find().then(res => {
      console.log(res);
      for(var i = 0; i < res.length ;i++){
        document.write(res[i].username + "&nbsp;&nbsp;&nbsp;&nbsp;" + res[i].paddr + "&nbsp;&nbsp;&nbsp;&nbsp;" + res[i].taddr + "&nbsp;&nbsp;&nbsp;&nbsp;" + res[i].amount + "&nbsp;&nbsp;&nbsp;&nbsp;" + res[i].createdAt + "</br>");
      }
    })
  },

  listAllbuy: async function(){
    Bmob.initialize("c10761a122fca01d", "000727");
    const query = Bmob.Query("Buy");
    query.find().then(res => {
      console.log(res);
      for(var i = 0; i < res.length ;i++){
        document.write(res[i].username + "&nbsp;&nbsp;&nbsp;&nbsp;" + res[i].addr + "&nbsp;&nbsp;&nbsp;&nbsp;" + res[i].seller + "&nbsp;&nbsp;&nbsp;&nbsp;" + res[i].goodsid + "&nbsp;&nbsp;&nbsp;&nbsp;" + res[i].num + "&nbsp;&nbsp;&nbsp;&nbsp;" + res[i].createdAt + "</br>");
      }
    })
  },

  listAbuy: async function(){
    Bmob.initialize("c10761a122fca01d", "000727");
    const query = Bmob.Query("Buy");
    query.equalTo("addr", "==", document.getElementById("teenAddr10").value)
    query.find().then(res => {
      console.log(res);
      for(var i = 0; i < res.length ;i++){
        document.write(res[i].username + "&nbsp;&nbsp;&nbsp;&nbsp;" + res[i].addr + "&nbsp;&nbsp;&nbsp;&nbsp;" + res[i].seller + "&nbsp;&nbsp;&nbsp;&nbsp;" + res[i].goodsid + "&nbsp;&nbsp;&nbsp;&nbsp;" + res[i].num + "&nbsp;&nbsp;&nbsp;&nbsp;" + res[i].createdAt + "</br>");
      }
    })
  },
}

window.App = App;

window.addEventListener("load", function () {
  // console.log("load+++++");
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:8545"),
    );
  }

  App.start();
});


