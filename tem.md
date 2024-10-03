















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














`payable` 
`payable(address)：`:将address转为payable







`import "./someothercontract.sol";`
```solidity
struct可类似于uint做数据类型
```
`stroage memory calldata`
`Zombie storage myZombie = zombies[_zombieId];`
`now`
`uint[]`:数组
















keccak256(abi.encodePacked(value, fake, secret))
