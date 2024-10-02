> 学习资源
> [https://web3js.readthedocs.io/en/v1.10.0/getting-started.html](https://web3js.readthedocs.io/en/v1.10.0/)

# User Documentation
## Getting Started
`npm install web3`

`import Web3 from 'web3';`

`const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");`

`const web3 = new Web3(window.ethereum);`

`window.ethereum`:Most Ethereum-supported browsers like MetaMask have an EIP-1193 compliant provider available at  `window.ethereum`


# API Reference
## web3.eth.Contract
### new contract
`new web3.eth.Contract(jsonInterface[, address][, options])`

`const contract = new web3.eth.Contract(abi, contractAddress);`
### methods.myMethod.call
`myContract.methods.myMethod([param1[, param2[, ...]]]).call(options [, defaultBlock] [, callback])`

```
// using the promise
myContract.methods.myMethod(123).call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
.then(function(result){
    ...
});
```
### methods.myMethod.send
`const tx = await contract.methods.bid().send({ from: account, value: weiAmount}); `
### events
```
contract.events.LuckyNumberSetted({}, function(error, event){ console.log(event); })
.on('data', function(event) {
    console.log("event", event);
    setEventLuckyNumber(event.returnValues.newLuckyNumber.toString())
})
```
## web3.utils
### isAddress
`web3.utils.isAddress(address)`  return`Boolean`
### toWei
`web3.utils.toWei(number [, unit])`

`const weiAmount = web3.utils.toWei(bidAmount, 'ether');`

# 其他

写合约时，需要请求访问账户：
```
// 请求用户授权访问他们的账户
const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
setAccount(accounts[0]);    // 当前账户
```










