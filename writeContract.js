import Web3 from 'web3';   //重点
import { contractInfo } from './contractInfo/contractInfo';
import { useEffect, useState } from 'react';

const { contractAddress, abi } = contractInfo;//重点

function WriteContract() {
    const [web3, setWeb3] = useState(null);    //这个很重要
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);
    
    const [voterAddress, setVoterAddress] = useState('');


    useEffect(() => {
        async function initWeb3() {
            if (window.ethereum) {                                      //重点
                const web3Instance = new Web3(window.ethereum);         //重点
                try {
                    setWeb3(web3Instance);
                    // 请求用户授权访问他们的账户
                    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }); //重点
                    setAccount(accounts[0]);                                                           //重点

                    // 初始化合约实例
                    const contractInstance = new web3Instance.eth.Contract(abi, contractAddress);       //重点
                    setContract(contractInstance);                                                      //重点
                } catch (error) {
                    console.error('Error initializing Web3:', error);
                }
            }
        }
        initWeb3();
    }, []);

    const giveRightToVote = async () => {
        if (!contract || !account) {
            console.error('Contract or account not initialized');
            return;
        }

        if (!voterAddress) {
            console.error('Voter address is required');
            return;
        }

        try {
            // 调用合约的 giveRightToVote 方法
            const tx = await contract.methods.giveRightToVote(voterAddress).send({ from: account }); //重点
            console.log('Transaction successful:', tx);
        } catch (error) {
            console.error('Error calling giveRightToVote:', error);
        }
    };

    return (
        <div>
            <h1>Write Contract</h1>
            <h2>giveRightToVote</h2>
            <div>
                <input
                    type="text"
                    placeholder="Enter voter address"
                    onChange={(e) => setVoterAddress(e.target.value)}
                />
                <button onClick={giveRightToVote}>Give Right to Vote</button>
            </div>        
        </div>
    );
}

export default WriteContract;
