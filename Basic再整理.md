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
#### Data location
`memory`: 这种写法适用于只需要读取数据而不需要修改存储中的数据的情况

`storage`: 存储在区块链上的持久化数据，这种写法适用于需要直接修改存储中的数据的情况

`calldata`: `calldata` is somehow similar to `memory`, but it's only available to `external` functions.

> 选择使用 `calldata` 还是 `memory` 取决于你的具体需求。如果你不需要修改数据，并且希望节省 gas，那么使用 `calldata` 是一个不错的选择

如果不声明，默认值如下：

状态变量（State Variables）： storage

局部变量（Local Variables）： memory

函数参数（Function Parameters）： a.external :calldata, b.internal or public: memory

> `string` 类型是动态大小的数据类型，适合存储在 `memory` 中。 `array`,`struct`数据太大了，最好显式声明以减少gas的消耗

#### Arrays

fixed size：`T[k]`

dynamic size: `T[]`

`uint[3] storage values; `

`uint[] memory values = new uint[](3);` // memory中必须用 `new`，不能`uint[3] values`


Array Members:

`length`

`push(x)`:返回值是新数组的长度

#### Array Slices
略...

#### Structs
```
struct Campaign {
    address payable beneficiary;
    uint fundingGoal;
    uint numFunders;
    uint amount;
    mapping(uint => Funder) funders;
}
```

### Mapping Types
```
mapping(address => uint256) private _balances;
mapping(address => mapping(address => uint256)) private _allowances;
```

### Operators
`++`, `--`,`**`,`+`,`-`,`*`,`/`,`%`,`&&`,`||`

### Conversions between Elementary Types
```
int  y = -3;
uint x = uint(y);
```

### Conversions between Literals and Elementary Types
略...

## Units and Globally Available Variables

### Ether Units
- `wei`: `wei` 是以太币的最小单位
- `gwei`: 1 `gwei` == 1e9 `wei`
- `ether`: 1 `ether` == 1e18 `wei`

### Time Units
```
1 == 1 seconds

1 minutes == 60 seconds

1 hours == 60 minutes

1 days == 24 hours

1 weeks == 7 days
```

### Special Variables and Functions

#### Block and Transaction Properties
- `block.timestamp` (`uint`): current block timestamp as seconds since unix epoch
- `msg.data` (`bytes calldata`): complete calldata
- `msg.sender` (`address`): sender of the message (current call)
- `msg.value` (`uint`): number of wei sent with the message

#### ABI Encoding and Decoding Functions
- `abi.encodePacked(...) returns (bytes memory)`

#### Members of bytes
略...

#### Members of string
略...

#### Error Handling
- `assert(bool condition)`
- `require(bool condition)`
- `require(bool condition, string memory message)`
- `revert()`
- `revert(string memory reason)`

#### Mathematical and Cryptographic Functions
- `keccak256(bytes memory) returns (bytes32)`: compute the Keccak-256 hash of the input

#### Members of Address Types
- `<address>.balance (uint256)`: balance of the Address in Wei
- `<address payable>.transfer(uint256 amount)`
- `<address payable>.send(uint256 amount) returns (bool)`

#### Contract-related
略...

#### Type Information
- `type(T).min`
- `type(T).max`

### Reserved Keywords
略...

## Expressions and Control Structures
### Control Structures
There is: `if`, `else`, `while`, `do`, `for`, `break`, `continue`, `return`, with the usual semantics known from C or JavaScript.

Solidity also supports exception handling in the form of `try/catch`-statements, but only for external function calls and contract creation calls. Errors can be created using the revert statement.


### Function Calls
#### Internal Function Calls
略...

#### External Function Calls
略...

#### Function Calls with Named Parameters
略...

#### Omitted Names in Function Definitions
略...

### Creating Contracts via new
略...

### Order of Evaluation of Expressions
略...

### Assignment
略...

### Scoping and Declarations
略...

### Checked or Unchecked Arithmetic
```
contract C {
    function f(uint a, uint b) pure public returns (uint) {
        // This subtraction will wrap on underflow.
        unchecked { return a - b; }
    }
    function g(uint a, uint b) pure public returns (uint) {
        // This subtraction will revert on underflow.
        return a - b;
    }
}
```

### Error handling: Assert, Require, Revert and Exceptions
#### Panic via assert and Error via require
#### revert
#### try/catch
