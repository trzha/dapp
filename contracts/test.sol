pragma solidity>=0.4.22;

contract test{
    mapping(address => uint) public parentBal;//父母余额
    struct rece{
        address taddr;
        uint money;
    }
    mapping(address => rece) public prece;//父母收到孩子的请求
    mapping(address => uint) public teenBal;//青少年余额
    mapping(address => uint) public teenLim;//青少年零用钱使用范围
    mapping(address => uint) public teenSale;//青少年已使用的钱
    mapping(address => uint) public sellerMoney;//商家赚的钱
    mapping(address => mapping(uint => bool)) public isBuy;//青少年是否可以买某一商户的某一商品
    mapping(address => mapping(uint => uint)) public priceGoods;//商家商品的价格
    mapping(address => mapping(uint => uint)) public avaGoods;//商家商品的库存
    mapping(address => mapping(uint => uint)) public saleGoods;//商家商品的销量
    mapping(address => mapping(uint => string)) public imgGoods;//商家商品图片的hash
    mapping(address => mapping(uint => uint)) public Allofid;//保存某一商家所有不同的id
    mapping(address => uint) public idnum;//保存某一商家不同商品数量

    event SendparBal(
        address addr,
        uint amount
    );

    event SetGoods(
        address addr,
        uint id, 
        uint price, 
        uint ava,
        bool isTeen, 
        string hash
    );

    event SendteenBal(
        address addr,
        address receiver, 
        uint amount
    );

    event SetLim(
        address addr,
        address receiver, 
        uint maxAmount
    );

    event Buy(
        address addr,
        address seller, 
        uint id, 
        uint num
    );
   /*
    constructor() public { 
        parentBal[0x9aA545e28803cA163149D43Af207ec31cff6A67E] = 100;
        // teenBal[0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2] = 40;
        // teenLim[0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2] = 20;
        // priceGoods[0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db][1] = 3;
        // isBuy[0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db][1] = true;
    }
    */
    function getParBal(address parAddr) view public returns(uint){
        return parentBal[parAddr];
    }
    function getTeenBal(address teenAddr) view public returns(uint){
        return teenBal[teenAddr];
    }
    function getTeenLim(address teenAddr) view public returns(uint){
        return teenLim[teenAddr];
    }
    function getTeenSale(address teenAddr) view public returns(uint){
        return teenSale[teenAddr];
    }
    function getSellerMoney(address sellerAddr) view public returns(uint){
        return sellerMoney[sellerAddr];
    }
    function getIsBuy(address sellerAddr, uint id) view public returns(bool){
        return isBuy[sellerAddr][id];
    }
    function getPriceGoods(address sellerAddr, uint id) view public returns(uint){
        return priceGoods[sellerAddr][id];
    }
    function getAvaGoods(address sellerAddr, uint id) view public returns(uint){
        return avaGoods[sellerAddr][id];
    }
    function getSaleGoods(address sellerAddr, uint id) view public returns(uint){
        return saleGoods[sellerAddr][id];
    }
    function getAllofid(address sellerAddr, uint numth) view public returns(uint){
        return Allofid[sellerAddr][numth];
    }
    function getidnum(address sellerAddr) view public returns(uint){
        return idnum[sellerAddr];
    }
    function getprecetaddr(address paddress) view public returns(address){
        return prece[paddress].taddr;
    }
    function getprecemoney(address paddress) view public returns(uint){
        return prece[paddress].money;
    }
    function getimgGoods(address sellerAddr, uint id)view public returns(string memory){
        return imgGoods[sellerAddr][id];
    }
    //父母方法
    function sendteenBal(address receiver, uint amount) public {//父母发钱
        require(parentBal[msg.sender] >= amount);
        require(teenBal[receiver] + amount >= teenBal[receiver]);
        parentBal[msg.sender] -= amount;
        teenBal[receiver] += amount;
        emit SendteenBal(msg.sender, receiver, amount);
    }
    function setLim(address receiver, uint maxAmount) public {//父母设置零用钱使用范围
        require(maxAmount <= teenBal[receiver]);//保证上限低于青少年拥有的钱
        teenLim[receiver] = maxAmount;
        emit SetLim(msg.sender, receiver, maxAmount);
    }


    //青少年方法
    function buy(address seller, uint id, uint num) public {//买商品
        //require(isBuy[seller][id] == true);
        //require(teenLim[msg.sender] >= priceGoods[seller][id]);
        teenLim[msg.sender] -= num * priceGoods[seller][id];
        teenBal[msg.sender] -= num * priceGoods[seller][id];
        teenSale[msg.sender] += num *priceGoods[seller][id];
        sellerMoney[seller] += num * priceGoods[seller][id];
        saleGoods[seller][id] += num;
        avaGoods[seller][id] -= num;
        emit Buy(msg.sender, seller, id, num);
    }

    function ask(address paddress, uint amount) public{//向父母要钱
        prece[paddress].taddr = msg.sender;
        prece[paddress].money = amount;
    }

    //后台方法
    function setGoods(uint id, uint price, uint ava,bool isTeen, string memory hash) public {//商家上架商品
        priceGoods[msg.sender][id] = price;
        isBuy[msg.sender][id] = isTeen;
        avaGoods[msg.sender][id] += ava ;
        idnum[msg.sender]++;//这里可改进（如果商家上架相同id的商品可以判断）
        Allofid[msg.sender][idnum[msg.sender]] = id;
        imgGoods[msg.sender][id] = hash;
        emit SetGoods(msg.sender, id, price, ava, isTeen, hash);
    }

    function sendparBal(address receiver, uint amount) public returns(bool){//给父母账号发钱
        require(parentBal[receiver] + amount >= parentBal[receiver]);
        parentBal[receiver] += amount;
        emit SendparBal(receiver, amount);
        return true;
    }
    
}