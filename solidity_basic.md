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
1. Booleans
   
   `bool`: The possible values are constants `true` and `false`.
   
2. Integers
   
   `uint
   
3. Address
   `address`: Holds a 20 byte value (size of an Ethereum address).
   
   `address payable`: Same as address, but with the additional members `transfer` and `send`.
   
    `address(0)`
   
5. Fixed-size byte arrays
   
   `bytes32`

   `bytes32(0)`:表示一个 32 字节的零值。

6. Enums
   `enum ActionChoices { GoLeft, GoRight, GoStraight, SitStill }`

7. Function Types
   `function (<parameter types>) {internal|external} [pure|view|payable] [returns (<return types>)]`

### Reference Types
1. Data location
   
   `memory`, `storage` and `calldata`

2. Arrays

    fixed size：`T[k]`

    dynamic size: `T[]`

    Array Members: `length`, `push(x)`

3. Struct
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

## Expressions and Control Structures
There is: `if`, `else`, `while`, `do`, `for`, `break`, `continue`, `return`, with the usual semantics known from C or JavaScript.

Solidity also supports exception handling in the form of `try/catch`-statements, but only for external function calls and contract creation calls. Errors can be created using the revert statement.

### Error handling: Assert, Require, Revert and Exceptions
1.`require`
`require(msg.value % 2 == 0, "Even value required.");`
`require(msg.value % 2 == 0);`

2.`revert`
`revert`:语句用于回滚当前的交易，并返回剩余的 gas,函数会立即终止执行
`revert NotEnoughFunds(amount, balance);` 

## Contracts
### Visibility and Getters
1. State Variable Visibility
   `public`, `internal`, `private`
   > `private`:合约内部，`internal`：合约内部 + 子合约

3. Function Visibility
   `public`：自动生成 getter 函数
   
   `private`：只能在定义它的合约内部被调用,函数名前面一般加 `_`
   
   `internal`：`private` + 继承它的合约中被调用
   
   `external`：仅合约外部可访问
   
5. Getter Functions
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
`block.timestamp`

`address(this).balance`

`block.number`

`msg.value`   

`msg.sender`

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

contract Middle is Base {}
```

### Interfaces
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
`now`






