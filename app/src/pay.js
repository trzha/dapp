const AliPaySdk = require('alipay-sdk').default;
const AlipayFormData = require('alipay-sdk/lib/form').default;
var Bmob = require('hydrogen-js-sdk/src/lib/app.js');

const alipaysdk = new AliPaySdk({
    appId: "2021000119629132",
    privateKey: "MIIEogIBAAKCAQEAuZhlqw+jsfUT9Kkro2D6uibwy9fModZH8iXrXTPlbficTslSXSGOTEWVVdXd1wLMiDDYKdvvAI8uzoIAVgqjikvVnj7OOuExcRIBfiCtZvL9EDH2nOWs4+32uS13aZo7YEFCWtsYqR8QlxuCHenwuyYPtU7lXMEKw2dC63bNjBpxKyZdBOB44orKpH+KICTz/8pvlxYA4kFoZkCckhkBI4xAcEAzh0bvQ4zgiiSBy4qqhK6RKYrCZ1l1Sk768chy+pqYcWZlEwuuvfxxe/KVq888WrS8QzDdwh0ZMVmVepjWLh+vArcq4fGKv2T0IYV32CMzVREWwF5dEW39UvSBJwIDAQABAoIBAGLksp/g2H/VsEl47xjCbzdL0pk7pv1BOdrsm6pxIbpkc52DptCbNcCsfzNanzeXdTbImBZN699nbDB7kwRF7PifCfelTayQHBE83/C+JsepiHDdvqPBuktFnGb1tCBgH21duKbDAjPzqppp/P5FjpGaaVpZ7NtsvXh7iGwBROt2rb8fozozH3C6UUHOuyQPHsScoZy+zZArR80dDC1FlvPzm+/0TzSFON2FdG0MyQZjwX+RKCDo2CKQadXZ1nioWWz0caneToPHioSJT8j3HM6VHWrTIe2OTz3yUbBNzPpbl806ODjkVwI3JDs8/F7LwfX9BYR29T7eucEOTjnkQukCgYEA89Pz6If1Z06PpuCAPjExyP2kBhRql7Ff9s9099O9E7eaFX0f+kTW+UL7wvDxflYbtWsy26ewEAEz0z9YKgw7XxbVL6UFuWO7nE7V7YBRl1ayxESH1BPhA66G+P+ojuGM03pOGLGKUhpzgHLEu/Jv9qNhSig4L/AB7lNhRZEvRyUCgYEAwtw/tsRn7DbBsCZvjdTwK8PzzGaNg3Uf35A0x7s3Q6hZEGwxWOpRTtMP4Xl9615Kpgx+2y4ORNn0mfg6mhK12AYf1oYiQMz3MNlnoCr+f/sATdUHlIcTLREmArv4K2AeaseRW8PRZTgjBlDeasht7lWwDJn+F9Jgk8eDaqR3K1sCgYB9Q6WqD7cmpLiuTeX0jYd7L7uFmBWO6wRXIwt/ips3tvqFEaxNAfLDSgNXijs24XwIvxL4v/R2tHdwjrl3mKMj3fIWMRx4uuEWk3XaNzMzocnjhSWW8cOHBbG32Hg7N2sG9m2KyCM8vPQbyFqECDA3MIZ596GuFwqW6uUtPUJhtQKBgBIrdWl2cPZOuMrTGq3QAEEkeXRCz8lFP56aFMHXDDUr2no0jHltB/3gomd066/pz+4h1iZb6gqzhCJjShuZyQkGsStQwJroQdh1PTtrJuYKIqIfTiCkY75dDf1NR7vLr6pnR3+WB813aZSqL8MnQ1Do/ox+Q3o3LLg6718fTNlnAoGADsXRnmNPtxK6Z82/MB0iNB8oCZvRxf7RxpMNbUoMp+KUas4QfSUq6bl/nGdPPyl3728uSoYaGIFf+FemVyHvwN9P5eVyzYuLJ4UuksTjqXY99K8O3wUQfQZGqCYeKDI+x1PJEXyUf2nn+02kIPkDj9rUaTXBTmr+d7FFgQy00R8=",
    alipayPublicKey: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhUUQcpXErNLzG5IeNgJPCvxFHJ47tUNWLvVODMufaba+SV0GSV+RgQINWQ3F2TaWCDNBh59Nb6LMLjXZRhFNmDY+RXZRYglkpmzQ8hl/5+72Q9OB1lnw5kecdssyxsnfG8LvUZfo7zJJH7tZQWCgwKYWiqSKz3oP/sfrcjzBlHXbJrlSP1LrJRZoU40jWMMLxvmo7+eOKucNiXq/TLUCIM2cDB0toMUYzn28EasDI5dTI2y/ow0lCSXxb5ykBUNTYMm9Af9rP+Q/X9z/N2/8gAKS/XvEOzz7MbWb64xp+Xw8xLx1X+089VS7VcyqIoXbV4wG7RSI9ZM+RUaee09ziwIDAQAB",
    gateway: "https://openapi.alipaydev.com/gateway.do"
})

const express = require('express');
const app = express();
//const router = express.Router();
var amount;


// const Web3 = require('web3')
// const testArtifact = require('../../build/contracts/test.json')
// const Bmob = require("hydrogen-js-sdk");
// const rpcURL = "https://ropsten.infura.io/v3/ec5b7d7541a34823a3f12797e9b017ad"
// const web3 = new Web3(rpcURL)
// //
// //var web3 = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
// const abi = testArtifact.abi
// const address = "0x0Fa852319205C0969718Ff02A0856036c90b87A4";
// const contract = new web3.eth.Contract(abi, address)




app.get('/pay', async (req, res) => {
    // 输出 JSON 格式
    var response = {
        "first_name": req.query.first_name,
        "second_name": req.query.second_name,
    };
    amount = req.query.first_name;
    trade_no = req.query.second_name;
    console.log(response);
    //res.end(JSON.stringify(response));
    let formData = new AlipayFormData();
    // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
    formData.setMethod('get');//返回支付地址
    formData.addField('returnUrl', 'http://127.0.0.1:8080/index.html');//支付成功的回调
    formData.addField('bizContent', {
        outTradeNo: trade_no,//订单号
        productCode: 'FAST_INSTANT_TRADE_PAY',//订单码
        totalAmount: amount,//金额
        subject: '充值',//标题
        body: '向账户中充值',//内容
    });

    const result = await alipaysdk.exec(
        'alipay.trade.page.pay',
        {},
        { formData: formData },
    );
    // res.json({
    //     url: result
    // })
    console.log(result);
    res.redirect(result);
})
//openapi.alipaydev.com/gateway.do?method=alipay.trade.page.pay&app_id=2021000119629132&charset=utf-8&version=1.0&sign_type=RSA2&timestamp=2022-03-27%2015%3A53%3A25&return_url=http%3A%2F%2F127.0.0.1%3A8080%2Findex.html&sign=kPm%2F5me%2BevBUsCKLz8kKJ6N7J3gNGEXIdA84Kl8WCXuQUPT7KVeud%2FNjgR%2Fk09CxqLmRSkER%2Bjazzzowrq%2F8UwjkwliHrDou6zv3bmxNFWlq%2BCSL6CsnFwWAaGx1861iP9HbvB2pFyZggKABjQXi3Q4I8BcAIZ65ro7XFX4kJu3Wmzdnd1JGq2%2BT%2F3zBMoR5DuCHSZVt6Dc6LI235lZeLH6Rmux5BAqYQhYwTL5l9bVkbqaIoSfH9EzBjnJWTTOkpQHCSOwVTlacYdBOwSjfoEO97JmHiRp%2Bu3XkZaUTxmXXhTBbZzg61qLggdwy3i6nxF7jgdEZsJNDWE7ClWwihQ%3D%3D&alipay_sdk=alipay-sdk-nodejs-3.2.0&biz_content=%7B%22out_trade_no%22%3A0.20397980696646534%2C%22product_code%22%3A%22FAST_INSTANT_TRADE_PAY%22%2C%22total_amount%22%3A%22111%22%2C%22subject%22%3A%22%E5%85%85%E5%80%BC%22%2C%22body%22%3A%22%E5%90%91%E8%B4%A6%E6%88%B7%E4%B8%AD%E5%85%85%E5%80%BC%22%7D
app.get('/refund', async(req, res)=>{
    // 输出 JSON 格式
    var response = {
        "third_name": req.query.third_name,
        "forth_name": req.query.forth_name,
    };
    var amount;
    var trade_no = req.query.third_name;
    amount = req.query.forth_name;
    console.log(response);
    //res.end(JSON.stringify(response));

    

    const formData = new AlipayFormData()
    formData.setMethod('get')
    formData.addField('bizContent', {
        out_trade_no: trade_no,
        refund_amount: amount,
    });

    const result = await alipaysdk.exec(
        'alipay.trade.refund',
        {},
        { formData: formData},
    );
    console.log(result);
    res.redirect(result);
})


app.listen(9001, () => {
    console.log('success, http://localhost:9001/pay');
    //Bmob.initialize("08638e06c054fbdc", "000727");
})
function SetupEventlistener() {
    console.log("event")
    // // 获取事件
    // contract.getPastEvents(
    //     'AllEvents',
    //     {
    //         fromBlock: 0,
    //         toBlock: 'latest'
    //     },
    // ).then(function (events) {
    //     console.log(events)
    // });
    contract.events.SendparBal({
        filter: {},
        fromBlock: 0,
        toBlock: 'latest'
    }, function (error, result) { })
        .on("data", function (result) {
            //console.log(result);
            console.log("监听到")
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
}

//SetupEventlistener();
