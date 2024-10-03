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
`block.timestamp`  `address(this).balance`   `block.number`  `msg.value`   msg.sender

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

# Resources
## Style Guide

## Common Patterns

## Resources

## Contributing

## Language Influences
## Solidity Brand Guide






