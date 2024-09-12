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
### Value Types
`int / uint`: uint8 / uint256


### 算术运算
`+  -  *  /  %    **`

### Block and Transaction Properties
`msg.sender` `msg.value`

```solidity
require();
```

### Validations and Assertions
`assert(bool condition)`

`require(bool condition)`

### Mathematical and Cryptographic Functions
`keccak256(bytes memory)`

### Modifiers
`pure`  `view`  `payable`  `indexed`

`++`
`import "./someothercontract.sol";`
```solidity
struct可类似于uint做数据类型
```
`stroage memory`
`Zombie storage myZombie = zombies[_zombieId];`
