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
