https://cryptozombies.io/en/lesson/3/chapter/11

https://github.com/MaiJiantian/solidityExample

官方教程的example已学完Simple Open Auction

# Basics

## Introduction to Smart Contracts

## Solidity by Example

## Installing the Solidity Compiler

# Language Description

## Layout of a Solidity Source File

## Structure of a Contract

## Types

## Units and Globally Available Variables

## Expressions and Control Structures

## Contracts

## Inline Assembly

## Cheatsheet


## Language Grammar

# Compiler
## Using the Compiler

## Analysing the Compiler Output
## Solidity IR-based Codegen Changes

# Internals
## Layout of State Variables in Storage and Transient Storage

## Layout in Memory

## Layout of Call Data
## Cleaning Up Variables
## Source Mappings
## The Optimizer

## Contract Metadata

## Contract ABI Specification

# Advisory content

## Security Considerations

## List of Known Bugs
## Solidity v0.5.0 Breaking Changes

## Solidity v0.6.0 Breaking Changes

## Solidity v0.7.0 Breaking Changes

## Solidity v0.8.0 Breaking Changes

# Additional Material
## NatSpec Format

## SMTChecker and Formal Verification

## Yul

## Import Path Resolution

# Resources
## Style Guide

## Common Patterns

## Resources

## Contributing

## Language Influences
## Solidity Brand Guide





## contract
### constract-definition
```solidty
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract contractName {

}
```
### interface
```solidity
contract KittyInterface {
  function getKitty(uint256 _id) external view returns (
    bool isGestating,
    bool isReady,
    uint256 cooldownIndex,
    uint256 nextActionAt,
    uint256 siringWithId,
    uint256 birthTime,
    uint256 matronId,
    uint256 sireId,
    uint256 generation,
    uint256 genes
) ;
}
```
### contract inheritance
```solidity
contract ZombieFeeding is ZombieFactory {
    
}
```

## function-definition
### function框架
```solidity
function funcName(uint _age) public {
}
```

### payable 是一个修饰符，表示该函数可以接收以太币（ETH）。
```
function bid() external  payable  {

}
```
### 带returns
`
function withdraw() external returns(bool) {

}
`
### 构造函数
```solidity
constructor(bytes32[] memory proposalNames) {

}
```
构造函数在合约部署时自动执行一次，用于初始化合约的状态变量。

### Function Visibility Specifiers
`public`：自动生成 getter 函数

`private`：只能在定义它的合约内部被调用,函数名前面一般加 `_`

`internal`：`private` + 继承它的合约中被调用

`external`：仅合约外部可访问

### modifier-definition
```solidity
 modifier ownerOf(uint _zombieId) {
    require(msg.sender == zombieToOwner[_zombieId]);
    _;
  }
```

## Types
`uint age = 18;`

`address`

`address(0)` 

`address payable`：果没有 payable 修饰符，那么该地址变量不能接收以太币，尝试向其发送以太币会导致交易失败。

`bool`

`bytes32`

`bytes32(0)` 表示一个 32 字节的零值。具体来说，它是一个 32 字节的二进制数据，所有位都被设置为零。这个值通常用于表示一个空或无效的状态。

`mapping`

```
struct Voter {
    uint weight;
    bool voted;
    address delegate;
    uint vote; 
}
```
### Value Types
`int / uint`: uint8 / uint256


### 算术运算
`+  -  *  /  %    **`

### Block and Transaction Properties
`msg.sender` `msg.value`



### Validations and Assertions
`assert(bool condition)`

#### require(bool condition)
a.
`require(voters[voter].weight == 0);`
`require(voters[voter].weight == 0), "a message";`

### Mathematical and Cryptographic Functions
`keccak256(bytes memory)`

### Modifiers
`pure` 

`view` 

`payable` 
`payable(address)：`:将address转为payable

`indexed`

### NatSpec Format
`@title`:`/// @title A simulator for trees`

`@author`:`/// @author Larry A. Gardner`

`@notice`:`/// @notice You can use this contract for only the most basic simulation`

`@dev`：`/// @dev All function calls are currently implemented without side effects`

`@custom`:`/// @custom:experimental This is an experimental contract.`

`@param`:`/// @param rings The number of rings from dendrochronological sample`

`@return`: `/// @return Age in years, rounded up for partial years`

### Control Structures
There is: `if`, `else`, `whil`e, `do`, `for`, `break`, `continue`, `return`, with the usual semantics known from C or JavaScript.



`++`
`import "./someothercontract.sol";`
```solidity
struct可类似于uint做数据类型
```
`stroage memory calldata`
`Zombie storage myZombie = zombies[_zombieId];`
`now`
`uint[]`:数组

event HighestBidIncreased(address bidder, uint amount);
emit AuctionEnded(highestBidder, highestBid);

error AuctionAlreadyEnded();
revert AuctionAlreadyEnded();

error BidNotHighEnough(uint highestBid);
revert BidNotHighEnough(highestBid);

block.timestamp

`send`：返回值是bool类型，标注是否发送成功
```
address.send(amount）
```

`transfer`
`payable(address).transfer(amount)`:这个address需要payable，必须写成payable(address)


`revert` :语句用于回滚当前的交易，并返回剩余的 gas,函数会立即终止执行


`toWei`:
`const weiAmount = web3.utils.toWei(bidAmount, 'ether');`


event配emit  error配revert

keccak256(abi.encodePacked(value, fake, secret))
