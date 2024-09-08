```javascript
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const contractAddress  = '0x1147897B1F4EE6f42FF44b54F0ba5D6bF52FAaCF';
const abi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"number","type":"uint256"}],"name":"LuckyNumberSet","type":"event"},{"inputs":[],"name":"getLuckyNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_luckyNumber","type":"uint256"}],"name":"setLuckyNumber","outputs":[],"stateMutability":"nonpayable","type":"function"}]

function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [luckyNumber, setLuckyNumber] = useState(null);

  useEffect(() => {
    async function initWeb3() {
      // 检查是否安装了 MetaMask 或其他 Web3 提供者
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' }); // 请求用户授权
          setWeb3(web3Instance);

          // 创建合约实例
          const contractInstance = new web3Instance.eth.Contract(abi, contractAddress);
          setContract(contractInstance);

          // 获取当前的幸运数字
          const number = await contractInstance.methods.getLuckyNumber().call();
          setLuckyNumber(number);
          console.log(number);
        } catch (error) {
          console.error('Error initializing Web3:', error);
        }
      } else {
        console.error('Please install MetaMask or another Web3 provider.');
      }
    }

    initWeb3();
  }, []);

  const handleSetLuckyNumber = async (newNumber) => {
    if (contract) {
      try {
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        await contract.methods.setLuckyNumber(newNumber).send({ from: accounts[0] });
        setLuckyNumber(newNumber);
      } catch (error) {
        console.error('Error setting lucky number:', error);
      }
    }
  };

  return (
    <div>
      {luckyNumber ? (
        <div>
          <p>Current Lucky Number: {String(luckyNumber)}</p>
          <button onClick={() => handleSetLuckyNumber(44)}>Set Lucky Number to 42</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
```
