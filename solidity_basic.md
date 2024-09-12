### conract的基本框架
```solidty
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract contractName {

}
```
## function
### function框架
```solidity
function funcName(uint _age) public {
}
```


```solidity
msg.sender
require();
```

### modifier
```solidity
 modifier ownerOf(uint _zombieId) {
    require(msg.sender == zombieToOwner[_zombieId]);
    _;
  }
```
