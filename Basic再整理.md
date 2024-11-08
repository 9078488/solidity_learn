# 官方教程链接
> https://docs.soliditylang.org/en/v0.8.28/

# Basics

## Introduction to Smart Contracts

### A Simple Smart Contract
略...
### Blockchain Basics
略...
### The Ethereum Virtual Machine
略...

## Solidity by Example

### Voting
略...
### Blind Auction
略...
### Safe Remote Purchase
略...
### Micropayment Channel
略...
### Modular Contracts
略...

## Installing the Solidity Compiler

### Versioning
略...
### Remix
略...
### npm / Node.js
略...
### Docker
略...
### Linux Packages
略...
### macOS Packages
略...
### Static Binaries
略...
### Building from Source
略...
### CMake Options
略...
### The Version String in Detail
略...
### Important Information About Versioning
略...

# Language Description

## Layout of a Solidity Source File

### SPDX License Identifier
`// SPDX-License-Identifier: MIT`

### Pragmas
`pragma solidity ^0.8.20;`

### Importing other Source Files
`import {Contant} from "./facther.sol";`

### Comments
```
// This is a single-line comment.

/*
This is a
multi-line comment.
*/
```

## Structure of a Contract

### State Variables
```
contract SimpleStorage {
    uint storedData; // State variable
}
```

### Functions
```
contract SimpleAuction {
    function bid() public payable { // Function
    }
}
```

### Function Modifiers
```
contract Purchase {
    modifier onlySeller() { // Modifier
        require(
            msg.sender == address(0),
            "Only address(0) can call this."
        );
        _;
    }
}
```

### Events
> `event`  +   `emit`
```
event HighestBidIncreased(address bidder, uint amount); // Event

contract SimpleAuction {
    function bid() public payable {
        // ...
        emit HighestBidIncreased(msg.sender, msg.value); // Triggering event
    }
}
```
### Errors
> `error` + `revert`
```
error NotEnoughFunds(uint requested, uint available);

contract Token {
    mapping(address => uint) balances;
    function transfer(address to, uint amount) public {
        uint balance = balances[msg.sender];
        if (balance < amount)
            revert NotEnoughFunds(amount, balance);
        balances[msg.sender] -= amount;
        balances[to] += amount;
        // ...
    }
}
```

### Struct Types
```
contract Ballot {
    struct Voter { // Struct
        uint weight;
        bool voted;
        address delegate;
        uint vote;
    }
}
```

### Enum Types
```
contract Purchase {
    enum State { Created, Locked, Inactive } // Enum
}
```

## Types

### Value Types
#### Booleans
`bool`: `true`  `false`

#### Integers
- `uint`: `uint256`
- `uint8`
- `uint16`

#### Fixed Point Numbers
略...

#### Address
- `address`: Holds a 20 byte value (size of an Ethereum address).
- `address payable`: Same as `address`, but with the additional members `transfer` and `send`
-  Type conversions:

Implicit conversions from `address payable` to `address` are allowed

whereas conversions from `address` to `address payable` must be explicit via `payable(<address>)`

`address payable _owner = address(uint160(owner()));` //owner()返回的类型是`address`，但是不能直接赋值给`address payable`

- address(0)
- Members of Addresses: `balance` and `transfer`
```
address payable x = payable(0x123);
address myAddress = address(this);
if (x.balance < 10 && myAddress.balance >= 10) x.transfer(10);
```
   
#### Contract Types
略...

#### Fixed-size byte arrays
`bytes32`

`bytes32(0)`:表示一个 32 字节的零值。

#### Address Literals
`0xdCad3a6d3569DF655070DEd06cb7A1b2Ccd1D3AF`

#### Rational and Integer Literals
略...

#### String Literals and Types
String literals are written with either double or single-quotes ("foo" or 'bar')

#### Unicode Literals
`string memory a = unicode"Hello 😃";`

#### Hexadecimal Literals
略...

#### Enums
`enum ActionChoices { GoLeft, GoRight, GoStraight, SitStill }`

#### User-defined Value Types
略...

#### Function Types
`function (<parameter types>) {public|external|internal|private|} [pure|view|payable] [returns (<return types>)]`

### Reference Types
### Mapping Types
### Operators
### Conversions between Elementary Types
### Conversions between Literals and Elementary Types
