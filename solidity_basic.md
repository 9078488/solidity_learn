Contents
Keyword Index, Search Page

Basics

Introduction to Smart Contracts
A Simple Smart Contract
```solidty
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract contractName {

}
```
Blockchain Basics
The Ethereum Virtual Machine
Solidity by Example
Voting
Blind Auction
Safe Remote Purchase
Micropayment Channel
Modular Contracts
Installing the Solidity Compiler
Versioning
Remix
npm / Node.js
Docker
Linux Packages
macOS Packages
Static Binaries
Building from Source
CMake Options
The Version String in Detail
Important Information About Versioning
Language Description

Layout of a Solidity Source File
SPDX License Identifier
Pragmas
Importing other Source Files
Comments
Structure of a Contract
State Variables
Functions
Function Modifiers
Events
Errors
Struct Types
Enum Types
Types
Value Types
Reference Types
Mapping Types
Operators
Conversions between Elementary Types
Conversions between Literals and Elementary Types
Units and Globally Available Variables
Ether Units
Time Units
Special Variables and Functions
Reserved Keywords
Expressions and Control Structures
Control Structures
Function Calls
Creating Contracts via new
Order of Evaluation of Expressions
Assignment
Scoping and Declarations
Checked or Unchecked Arithmetic
Error handling: Assert, Require, Revert and Exceptions
Contracts
Creating Contracts
Visibility and Getters
Function Modifiers
Constant and Immutable State Variables
Functions
Events
Custom Errors
Inheritance
Abstract Contracts
Interfaces
Libraries
Using For
Inline Assembly
Example
Access to External Variables, Functions and Libraries
Things to Avoid
Conventions in Solidity
Advanced Safe Use of Memory
Cheatsheet
Order of Precedence of Operators
ABI Encoding and Decoding Functions
Members of bytes and string
Members of address
Block and Transaction Properties
Validations and Assertions
Mathematical and Cryptographic Functions
Contract-related
Type Information
Function Visibility Specifiers
Modifiers
Language Grammar
Compiler

Using the Compiler
Using the Commandline Compiler
Setting the EVM Version to Target
Compiler Input and Output JSON Description
Analysing the Compiler Output
Solidity IR-based Codegen Changes
Semantic Only Changes
Internals
Internals

Layout of State Variables in Storage and Transient Storage
Mappings and Dynamic Arrays
JSON Output
Layout in Memory
Differences to Layout in Storage
Layout of Call Data
Cleaning Up Variables
Source Mappings
The Optimizer
Benefits of Optimizing Solidity Code
Differences between Optimized and Non-Optimized Code
Optimizer Parameter Runs
Opcode-Based Optimizer Module
Yul-Based Optimizer Module
Codegen-Based Optimizer Module
Contract Metadata
Encoding of the Metadata Hash in the Bytecode
Usage for Automatic Interface Generation and NatSpec
Usage for Source Code Verification
Contract ABI Specification
Basic Design
Function Selector
Argument Encoding
Types
Design Criteria for the Encoding
Formal Specification of the Encoding
Function Selector and Argument Encoding
Examples
Use of Dynamic Types
Events
Errors
JSON
Strict Encoding Mode
Non-standard Packed Mode
Encoding of Indexed Event Parameters
Advisory content

Security Considerations
Pitfalls
Recommendations
List of Known Bugs
Solidity v0.5.0 Breaking Changes
Semantic Only Changes
Semantic and Syntactic Changes
Explicitness Requirements
Deprecated Elements
Interoperability With Older Contracts
Example
Solidity v0.6.0 Breaking Changes
Changes the Compiler Might not Warn About
Explicitness Requirements
Semantic and Syntactic Changes
New Features
Interface Changes
How to update your code
Solidity v0.7.0 Breaking Changes
Silent Changes of the Semantics
Changes to the Syntax
Removal of Unused or Unsafe Features
Interface Changes
How to update your code
Solidity v0.8.0 Breaking Changes
Silent Changes of the Semantics
New Restrictions
Interface Changes
How to update your code
Additional Material

NatSpec Format
Documentation Example
Tags
Documentation Output
SMTChecker and Formal Verification
Tutorial
SMTChecker Options and Tuning
Abstraction and False Positives
Real World Assumptions
Yul
Motivation and High-level Description
Simple Example
Stand-Alone Usage
Informal Description of Yul
Specification of Yul
Specification of Yul Object
Yul Optimizer
Complete ERC20 Example
Import Path Resolution
Virtual Filesystem
Imports
Base Path and Include Paths
Allowed Paths
Import Remapping
Using URLs in imports
Resources

Style Guide
Introduction
Code Layout
Order of Layout
Naming Conventions
NatSpec
Common Patterns
Withdrawal from Contracts
Restricting Access
State Machine
Resources
General Resources
Integrated (Ethereum) Development Environments
Editor Integrations
Solidity Tools
Third-Party Solidity Parsers and Grammars
Contributing
Team Calls
How to Report Issues
Workflow for Pull Requests
Running the Compiler Tests
Running the Fuzzer via AFL
Whiskers
Documentation Style Guide
Solidity Language Design
Language Influences
Solidity Brand Guide
The Solidity Brand
Solidity Brand Name
Solidity Logo License
Solidity Logo Guidelines
Credits


1.智能合约的框架
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
