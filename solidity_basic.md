```solidity
msg.sender
require();
```

### modifier
```solidity
 modifier ownerOf(uint _zombieId) {
    require(msg.sender == zombieToOwner[_zombieId]);
  }
```
