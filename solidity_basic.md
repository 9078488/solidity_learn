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

## Contracts

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






