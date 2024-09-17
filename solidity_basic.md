https://cryptozombies.io/en/lesson/3/chapter/11

https://github.com/MaiJiantian/solidityExample

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

`address` `address(0)`

`bool`

`bytes32`

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
`pure`  `view`  `payable`  `indexed`

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


