https://cryptozombies.io/en/lesson/3/chapter/11

https://ethereum.org/en/developers/docs/standards/tokens/erc-721/

https://github.com/MaiJiantian/solidityExample

https://github.com/manojpramesh/solidity-cheatsheet

官方教程的example已学完Simple Open Auction

# Basics

## Introduction to Smart Contracts

## Solidity by Example

## Installing the Solidity Compiler

# Language Description

## Layout of a Solidity Source File

## Structure of a Contract
> 一个contract框架里，先定义上本章节提及的`State Variables`,`Modifiers`,`Events`,`Errors`, `Struct Types`,`Enum Types`
> 再加上其他章节提及的`mapping`,`Arrays`
> 再定义`function`对这些进行处理
```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.0 <0.9.0;

contract SimpleStorage {
    // State Variables
    uint storedData;

    // Struct Types
    struct Voter {
        uint weight;
        bool voted;
        address delegate;
    }

    // Enum Types
    enum State { Created, Locked, Inactive } 

    // Modifier
    modifier onlySeller() { 
    require(msg.sender == seller);
    _;
    }

    // Events
    event HighestBidIncreased(address bidder, uint amount);

    // Errors
    error NotEnoughFunds(uint requested, uint available);
                      
    // Functions
    function bid() public onlySeller() {
        emit HighestBidIncreased(msg.sender, msg.value);

        if (balance < amount)
            revert NotEnoughFunds(amount, balance);              
    
    }
```

## Types
### Value Types
> `value type`: marked as `constant`
> `string constant TEXT = "abc";`
1. Booleans
   
   `bool`: The possible values are constants `true` and `false`.
   
2. Integers
   
   `uint`:实际是`uint256`
   `uint x = 16;`

   `uint32`

   `uint16`
   
4. Address
   `address`: Holds a 20 byte value (size of an Ethereum address).
   
   `address payable`: Same as address, but with the additional members `transfer` and `send`.

   `payable(address)`
   
    `address(0)`

    `address payable _owner = address(uint160(owner()));` //owner()返回的类型是`address`，但是不能直接赋值给`address payable`
   
6. Fixed-size byte arrays
   
   `bytes32`

   `bytes32(0)`:表示一个 32 字节的零值。


7. Enums
   `enum ActionChoices { GoLeft, GoRight, GoStraight, SitStill }`

> enum 不能配 `public`之类的标识符

8. Function Types
   `function (<parameter types>) {internal|external} [pure|view|payable] [returns (<return types>)]`

   > Let's make it an `external view` function, so we can call it from web3.js without needing any gas

### Reference Types
1. Data location
   
   `memory`: 这种写法适用于只需要读取数据而不需要修改存储中的数据的情况
   
   `storage`:存储在区块链上的持久化数据，这种写法适用于需要直接修改存储中的数据的情况
   
   `calldata`: `calldata` is somehow similar to `memory`, but it's only available to `external` functions.

 > 选择使用 `calldata` 还是 `memory` 取决于你的具体需求。如果你不需要修改数据，并且希望节省 gas，那么使用 `calldata` 是一个不错的选择。


   如果不声明，默认值如下：
   
   状态变量（State Variables）： `storage`

   局部变量（Local Variables）： `memory`

   函数参数（Function Parameters）： a.external :`calldata`, b.internal or public: `memory`

   > `string` 类型是动态大小的数据类型，适合存储在 `memory` 中。
   > `array`,`struct`数据太大了，最好显式声明以减少gas的小号

3. Arrays

    fixed size：`T[k]`

    dynamic size: `T[]`
   
    `uint[3] storage values; `

    `uint[] memory values = new uint[](3);` // memory中必须用 `new`，不能`uint[3] values`


    Array Members:

   `length`

   `push(x)`:返回值是新数组的长度

5. Struct
   ```
   struct Funder {
        address addr;
        uint amount;
    }
   ```
### Mapping Types
`mapping(address => uint) public balances;`

### Operators
`++`, `--`,`**`,`+`,`-`,`*`,`/`,`%`,`&&`,`||`
   
### Conversions between Literals and Elementary Types  
An `addres`s a can be converted explicitly to `address payable` via `payable(a)`
   

## Units and Globally Available Variables
### Ether Units
`wei`, `gwei` or `ether`

```
assert(1 wei == 1);
assert(1 gwei == 1e9);
assert(1 ether == 1e18);
```

### Time Units
```
1 == 1 seconds

1 minutes == 60 seconds

1 hours == 60 minutes

1 days == 24 hours

1 weeks == 7 days
```

### Special Variables and Functions
1.Members of Address Types

`<address>.balance (uint256)`

`<address payable>.transfer(uint256 amount)`

`<address payable>.send(uint256 amount) returns (bool)`

`address(this).balance`: `this.balance`已被替代

## Expressions and Control Structures
There is: `if`, `else`, `while`, `do`, `for`, `break`, `continue`, `return`, with the usual semantics known from C or JavaScript.

Solidity also supports exception handling in the form of `try/catch`-statements, but only for external function calls and contract creation calls. Errors can be created using the revert statement.

### Error handling: Assert, Require, Revert and Exceptions
1.`assert`
`assert(c >= a);`

2.`require`
`require(msg.value % 2 == 0, "Even value required.");`
`require(msg.value % 2 == 0);`

3.`revert`
`revert`:语句用于回滚当前的交易，并返回剩余的 gas,函数会立即终止执行
`revert NotEnoughFunds(amount, balance);` 



## Contracts
### Visibility and Getters
#### 1.State Variable Visibility
   `public`, `internal`, `private`
   > `private`:合约内部，`internal`：合约内部 + 子合约

#### 2.Function Visibility
   `public`：自动生成 getter 函数
   
   `private`：只能在定义它的合约内部被调用,函数名前面一般加 `_`
   
   `internal`：`private` + 继承它的合约中被调用
   
   `external`：仅合约外部可访问，比 `public`省gas
   
3. Getter Functions
   The compiler automatically creates getter functions for all `public` `state variables`
### Function Modifiers
```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.0 <0.9.0;

contract SimpleStorage {
    // Modifier
    modifier onlySeller() { 
    require(msg.sender == seller);
    _;
    }
                      
    // Functions
    function bid() public onlySeller() {
           
    }
```
### Constant and Immutable State Variables
`block.timestamp`: 原来是`now`，新版本用`block.timestamp`替代`now`

`address(this).balance`

`block.number`

`msg.value`   

`msg.sender`

`msg.data`

### Functions
1.基本格式
```
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract Simple {
    function arithmetic(uint a, uint b)
        public
        pure
        returns (uint sum, uint product)
    {
        sum = a + b;
        product = a * b;
    }
}
```
2.State Mutability： `pure`, `view`
```
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

contract C {
    // view:只读取区块链数据
    function f(uint a, uint b) public view returns (uint) {
        return a * (b + 42) + block.timestamp;
    }

    // pure：不和区块链发生交互，只函数内部进行运算
    function f(uint a, uint b) public pure returns (uint) {
        return a * (b + 42);
    }
}
```

3.Function Overloading
```
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract A {
    function f(uint value) public pure returns (uint out) {
        out = value;
    }

    function f(uint value, bool really) public pure returns (uint out) {
        if (really)
            out = value;
    }
}
```
### Custom Errors
```
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.27;

error InsufficientBalance(uint256 available, uint256 required);

contract TestToken {
   // 方式1
    function transferWithRevertError(address to, uint256 amount) public {
        if (amount > balance[msg.sender])
            revert InsufficientBalance({
                available: balance[msg.sender],
                required: amount
            });

    }

     // 方式2
    function transferWithRequireError(address to, uint256 amount) public {
        require(amount <= balance[msg.sender], InsufficientBalance(balance[msg.sender], amount));
    }
    // ...
}
```

### Inheritance
```
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Base
{
    function foo() virtual external view {}
}

contract Middle is Base, Base1 {}
```
#### Modifier Overriding
> `vitural` & `override`
```
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.0 <0.9.0;

contract Base
{
    modifier foo() virtual {_;}
}

contract Inherited is Base
{
    modifier foo() override {_;}
}
```

### Abstract Contracts
> 如果一个合约继承了抽象合约，但没有实现所有未实现的函数，那么这个合约也必须被标记为抽象合约。

```
abstract contract Feline {
    function utterance() public pure virtual returns (bytes32);
}

abstract contract Lion is Feline {
    // Lion 没有实现 utterance 函数，因此它也必须是抽象的
}
```
> 常见用法

```
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.0 <0.9.0;

abstract contract Feline {
    function utterance() public pure virtual returns (bytes32);
}

contract Cat is Feline {
    function utterance() public pure override returns (bytes32) { return "miaow"; }
}
```

> 提供通用模板

```
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.0 <0.9.0;

abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }
}

contract MyContract is Context {
    function getSender() public view returns (address) {
        return _msgSender();
    }
}
```

### Interfaces
> `interface`里的`function`必须都是`external`
```
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.2 <0.9.0;

interface Token {
    enum TokenType { Fungible, NonFungible }
    struct Coin { string obverse; string reverse; }
    function transfer(address recipient, uint amount) external;
}
```

```
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


### Libraries
```
library BigInt {
    function fromUint(uint x) internal pure returns (bigint memory r) {
        r.limbs = new uint[](1);
        r.limbs[0] = x;
    }
)
```


`use...for...`

```
contract C {
    using BigInt for bigint;

    function f() public pure {
        bigint memory x = BigInt.fromUint(7);
        bigint memory y = BigInt.fromUint(type(uint).max);
        bigint memory z = x.add(y);
        assert(z.limb(1) > 0);
    }
}
```

## Inline Assembly

## Cheatsheet
### Members of address
`<address payable>.send(uint256 amount)` returns (`bool`): send given amount of Wei to Address, returns false on failure

`<address payable>.transfer(uint256 amount)`: send given amount of Wei to Address, throws on failure
### Block and Transaction Properties
`block.timestamp` (`uint`): current block timestamp in seconds since Unix epoch

`msg.sender` (`address`): sender of the message (current call)

`msg.value` (`uint`): number of wei sent with the message

### Mathematical and Cryptographic Function
`keccak256(bytes memory)` returns (`bytes32`): compute the Keccak-256 hash of the input

### Modifiers
`pure` for functions: Disallows modification or access of state.

`view` for functions: Disallows modification of state.

`payable` for functions: Allows them to receive Ether together with a call.

```
```
function bid() external  payable  {

}
```
```

`indexed` for event parameters: Stores the parameter as topic.


## Language Grammar
`unchecked` : unchecked-block

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
### Non-standard Packed Mode
`keccak256(abi.encodePacked(value, fake, secret))`

# Advisory content

## Security Considerations

## List of Known Bugs
## Solidity v0.5.0 Breaking Changes

## Solidity v0.6.0 Breaking Changes

## Solidity v0.7.0 Breaking Changes

## Solidity v0.8.0 Breaking Changes

# Additional Material
## NatSpec Format
`@title`:`/// @title A simulator for trees`

`@author`:`/// @author Larry A. Gardner`

`@notice`:`/// @notice You can use this contract for only the most basic simulation`

`@dev`：`/// @dev All function calls are currently implemented without side effects`

`@custom`:`/// @custom:experimental This is an experimental contract.`

`@param`:`/// @param rings The number of rings from dendrochronological sample`

`@return`: `/// @return Age in years, rounded up for partial years`

## SMTChecker and Formal Verification

## Yul

## Import Path Resolution
`import "./someothercontract.sol";`

# Resources
## Style Guide
### Code Layout
1.`constructor`
> 构造函数在合约部署时自动执行一次，用于初始化合约的状态变量。
```
contract B {
    constructor(uint) {
    }
}
```

## Common Patterns

## Resources


## Contributing

## Language Influences
## Solidity Brand Guide

# 其他
It's convention to start `private` function names with an underscore (`_`).

Solidity 0.8.0 引入了内置的算术溢出检查机制，使得 SafeMath 库变得不再必要。开发者可以直接使用 Solidity 的算术操作符，而不需要额外的库来防止溢出和下溢问题。

## ERC721
需要用ERC721的interface，里面内容根据实际写
https://ethereum.org/en/developers/docs/standards/tokens/erc-721/

## ERC20
https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Context.sol 已学习

https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol 已学习

https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol 已学习

https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol 已学习



https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/extensions/IERC20Metadata.sol 已学习

https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/interfaces/draft-IERC6093.sol    `import {IERC20Errors}` 已学习






