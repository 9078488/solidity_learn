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
> enum 不能配 `public`之类的标识符

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
An `addres`s a can be converted explicitly to `address payable` via `payable(a)`

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
- `address(this).balance`: `this.balance`已被替代
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
-  `assert(c >= a);`
-  `require(msg.value % 2 == 0, "Even value required.");`
-  `require(msg.value % 2 == 0);`

#### revert
-  `revert`:语句用于回滚当前的交易，并返回剩余的 gas,函数会立即终止执行
-  `revert NotEnoughFunds(amount, balance);` 

#### try/catch
略...

## Contracts
### Creating Contracts
略...

### Visibility and Getters
#### State Variable Visibility
-  `public` : automatically generates `getter` functions for them
-  `internal`
-  `private`

#### Function Visibility
-  `external`: 仅合约外部可访问，比 `public`省gas
-  `public`: 自动生成 getter 函数
-  `internal`: `private` + 继承它的合约中被调用
-  `private`: 只能在定义它的合约内部被调用,函数名前面一般加 `_`

#### Getter Functions
The compiler automatically creates getter functions for all `public` `state variables`

### Function Modifiers
- 不带参数
```
contract owned {
    constructor() { owner = payable(msg.sender); }
    address payable owner;

    // This contract only defines a modifier but does not use
    // it: it will be used in derived contracts.
    // The function body is inserted where the special symbol
    // `_;` in the definition of a modifier appears.
    // This means that if the owner calls this function, the
    // function is executed and otherwise, an exception is
    // thrown.
    modifier onlyOwner {
        require(
            msg.sender == owner,
            "Only owner can call this function."
        );
        _;
    }
}
```
- 带参数
```
contract priced {
    // Modifiers can receive arguments:
    modifier costs(uint price) {
        if (msg.value >= price) {
            _;
        }
    }
}
```

### Transient Storage
略...

### Composability of Smart Contracts and the Caveats of Transient Storage
略...

### Constant and Immutable State Variables
> State variables can be declared as `constant` or `immutable`. In both cases, the variables cannot be modified after the contract has been constructed. For `constant` variables, the value has to be fixed at compile-time, while for `immutable`, it can still be assigned at construction time.

```
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.21;

uint constant X = 32**22 + 8;

contract C {
    string constant TEXT = "abc";
    bytes32 constant MY_HASH = keccak256("abc");
    uint immutable decimals = 18;
    uint immutable maxBalance;
    address immutable owner = msg.sender;

    constructor(uint decimals_, address ref) {
        if (decimals_ != 0)
            // Immutables are only immutable when deployed.
            // At construction time they can be assigned to any number of times.
            decimals = decimals_;

        // Assignments to immutables can even access the environment.
        maxBalance = ref.balance;
    }

    function isBalanceTooHigh(address other) public view returns (bool) {
        return other.balance > maxBalance;
    }
}
```

### Functions
#### Function Parameters and Return Variables
略...

#### State Mutability
- View Functions
- Pure Functions

#### Special Functions
略...

#### Function Overloading
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

### Events
#### Members of Events
略...

#### Example
```
contract ClientReceipt {
    event Deposit(
        address indexed from,
        bytes32 indexed id,
        uint value
    );

    function deposit(bytes32 id) public payable {
        // Events are emitted using `emit`, followed by
        // the name of the event and the arguments
        // (if any) in parentheses. Any such invocation
        // (even deeply nested) can be detected from
        // the JavaScript API by filtering for `Deposit`.
        emit Deposit(msg.sender, id, msg.value);
    }
}
```

#### Additional Resources for Understanding Events
略...

### Custom Errors
```
error InsufficientBalance(uint256 available, uint256 required);

contract TestToken {
    mapping(address => uint) balance;
    // 方式1
    function transferWithRevertError(address to, uint256 amount) public {
        if (amount > balance[msg.sender])
            revert InsufficientBalance({
                available: balance[msg.sender],
                required: amount
            });
        balance[msg.sender] -= amount;
        balance[to] += amount;
    }
    // 方式2
    function transferWithRequireError(address to, uint256 amount) public {
        require(amount <= balance[msg.sender], InsufficientBalance(balance[msg.sender], amount));
        balance[msg.sender] -= amount;
        balance[to] += amount;
    }
    // ...
}
```

### Inheritance
#### Function Overriding
> `virtual`  +  `override`

- 单base
```
contract Base
{
    function foo() virtual external view {}
}

contract Middle is Base {}

contract Inherited is Middle
{
    function foo() override public pure {}
}
```

- 双base
```
contract Base1
{
    function foo() virtual public {}
}

contract Base2
{
    function foo() virtual public {}
}

contract Inherited is Base1, Base2
{
    // Derives from multiple bases defining foo(), so we must explicitly
    // override it
    function foo() public override(Base1, Base2) {}
}
```

#### Modifier Overriding
> `virtual`  +  `override`

- 单base
```
contract Base
{
    modifier foo() virtual {_;}
}

contract Inherited is Base
{
    modifier foo() override {_;}
}
```

- 双base
```
contract Base1
{
    modifier foo() virtual {_;}
}

contract Base2
{
    modifier foo() virtual {_;}
}

contract Inherited is Base1, Base2
{
    modifier foo() override(Base1, Base2) {_;}
}
```

#### Constructors
```
abstract contract A {
    uint public a;

    constructor(uint a_) {
        a = a_;
    }
}

contract B is A(1) {
    constructor() {}
}
```

#### Arguments for Base Constructors
略...

#### Multiple Inheritance and Linearization
- Linearization of inheritance graph impossible
```
contract X {}
contract A is X {}
// This will not compile
contract C is A, X {}
```

#### Inheriting Different Kinds of Members of the Same Name
略...

### Abstract Contracts
> 如果一个合约继承了抽象合约，但没有实现所有未实现的函数，那么这个合约也必须被标记为抽象合约。
```
abstract contract Feline {
    function utterance() public pure virtual returns (bytes32);
}

contract Cat is Feline {
    function utterance() public pure override returns (bytes32) { return "miaow"; }
}
```

### Interfaces
>  `interface`里的`function`必须都是`external`
>   也可用`contract`关键字定义`interfac`
```
interface Token {
    enum TokenType { Fungible, NonFungible }
    struct Coin { string obverse; string reverse; }
    function transfer(address recipient, uint amount) external;
}
```

### Libraries
```
struct bigint {
    uint[] limbs;
}

library BigInt {
    function fromUint(uint x) internal pure returns (bigint memory r) {
        r.limbs = new uint[](1);
        r.limbs[0] = x;
    }

    function add(bigint memory a, bigint memory b) internal pure returns (bigint memory r) {
        r.limbs = new uint[](max(a.limbs.length, b.limbs.length));
        uint carry = 0;
        for (uint i = 0; i < r.limbs.length; ++i) {
            uint limbA = limb(a, i);
            uint limbB = limb(b, i);
            unchecked {
                r.limbs[i] = limbA + limbB + carry;

                if (limbA + limbB < limbA || (limbA + limbB == type(uint).max && carry > 0))
                    carry = 1;
                else
                    carry = 0;
            }
        }
        if (carry > 0) {
            // too bad, we have to add a limb
            uint[] memory newLimbs = new uint[](r.limbs.length + 1);
            uint i;
            for (i = 0; i < r.limbs.length; ++i)
                newLimbs[i] = r.limbs[i];
            newLimbs[i] = carry;
            r.limbs = newLimbs;
        }
    }

    function limb(bigint memory a, uint index) internal pure returns (uint) {
        return index < a.limbs.length ? a.limbs[index] : 0;
    }

    function max(uint a, uint b) private pure returns (uint) {
        return a > b ? a : b;
    }
}

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

### Using For
略...


## Inline Assembly
### Example
略...

### Access to External Variables, Functions and Libraries
略...

### Things to Avoid
略...

### Conventions in Solidity
略...

### Advanced Safe Use of Memory
略...

## Cheatsheet
### Order of Precedence of Operators
略...

### ABI Encoding and Decoding Functions
`abi.encodePacked(...) returns (bytes memory)`

### Members of bytes and string
略...

### Members of address
-  `<address>.balance (uint256)`: balance of the Address in Wei
-  `<address payable>.send(uint256 amount) returns (bool)`: send given amount of `Wei` to Address, returns `false` on failure
-  `<address payable>.transfer(uint256 amount)`: send given amount of `Wei` to Address, throws on failure

### Block and Transaction Properties
-  `block.timestamp` (`uint`): current block timestamp in seconds since Unix epoch 原来是`now`，新版本用`block.timestamp`替代`now`
-  `block.number (uint)`: current block number
-  `msg.data` (`bytes`): complete calldata
-  `msg.sender` (`address`): sender of the message (current call)
-  `msg.value` (`uint`): number of wei sent with the message
  
### Validations and Assertions
-  `assert(bool condition)`
-  `require(bool condition)`
-  `require(bool condition, string memory message)`
-  `revert()`
-  `revert(string memory message)`

### Mathematical and Cryptographic Functions
-  `keccak256(bytes memory) returns (bytes32)`

### Contract-related
略...

### Type Information
-  `type(T).min`
-  `type(T).max`
  
### Function Visibility Specifiers
```
function myFunction() <public|private|external|internal> returns (bool) {
    return true;
}
```

### Modifiers
-  `pure`: for functions: Disallows modification or access of state.
-  `view`: for functions: Disallows modification of state.
-  `payable`: for functions: Allows them to receive Ether together with a call.
-  `constant`: for state variables: Disallows assignment (except initialization), does not occupy storage slot.
-  `immutable`: for state variables: Allows assignment at construction time and is constant when deployed. Is stored in code.
-  `anonymous`: for events: Does not store event signature as topic.
-  `indexed`: for event parameters: Stores the parameter as topic.
-  `virtual`: for functions and modifiers: Allows the function’s or modifier’s behavior to be changed in derived contracts.
-  `override`: States that this function, modifier or public state variable changes the behavior of a function or modifier in a base contract.

# Compiler
略...

# Internals
略...

# Advisory content
略...

# Additional Material
## NatSpec Format
-  `@title`
-  `@author`
-  `@notice`
-  `@dev`
-  `@param`
-  `@return`
-  `@inheritdoc`
-  `@custom:...`

## SMTChecker and Formal Verification
## Yul
## Import Path Resolution

# Resources
略...
