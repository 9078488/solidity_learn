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
## web3.utils
### isAddress
`web3.utils.isAddress(address)`  return`Boolean`
### toWei
`web3.utils.toWei(number [, unit])`

`const weiAmount = web3.utils.toWei(bidAmount, 'ether');`


### Basic
##### 1.准备contract address, abi, endpoint
`window.ethereum`: writeContract时，用`window.ethereum`代替`endpoint`



#### 3.
`const web3 = new Web3(endPoint);`

写合约时，需要请求访问账户：
```
// 请求用户授权访问他们的账户
const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
setAccount(accounts[0]);   
```

#### 4.
`const contract = new web3.eth.Contract(abi, contractAddress);`

#### 5.
`contract.methods.auctionEndTime().call(),`
`const tx = await contract.methods.bid().send({ from: account, value: weiAmount}); `



#### other


