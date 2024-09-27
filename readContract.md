# file1
```solidity
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { contractInfo } from './contractInfo/contractInfo';

const { contractAddress, abi, endPoint } = contractInfo;

const web3 = new Web3(endPoint);
const contract = new web3.eth.Contract(abi, contractAddress);

function ReadContract() {
    const [data, setData] = useState({
        chairperson: null,
        proposals: null,
        voter: null,
        winnerName: null,
        winningProposal: null
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 并发调用多个异步操作
                const [chairpersonResult, proposalsResult, voterResult, winnerNameResult, winningProposalResult] = await Promise.all([
                    contract.methods.chairperson().call(),
                    contract.methods.proposals(1).call(),
                    contract.methods.voters('0x21d64fbe5A998Ad4F6196a5672647e7f192C2D49').call(),
                    contract.methods.winnerName().call(),
                    contract.methods.winningProposal().call()
                ]);

                setData({
                    chairperson: chairpersonResult,
                    proposals: proposalsResult,
                    voter: voterResult,
                    winnerName: winnerNameResult,
                    winningProposal: winningProposalResult.toString()
                });

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const renderData = (label, value, loadingMessage) => (
        <>
            <h1>{label}</h1>
            {value ? <div>{value}</div> : <div>{loadingMessage}</div>}
        </>
    );

    return (
        <>
            {renderData('Chairperson', data.chairperson, 'Loading chairperson')}
            {renderData('Proposals', data.proposals ? JSON.stringify(data.proposals.name) : null, 'Loading proposals')}
            {renderData('Voter', data.voter ? data.voter.weight.toString() : null, 'Loading voter')}
            {renderData('WinnerName', data.winnerName ? data.winnerName.toString() : null, 'Loading WinnerName')}
            {renderData('winningProposal', data.winningProposal, 'Loading winningProposal')}
        </>
    );
}

export default ReadContract;
```

# file2
```solidity
// src/contractInfo.js
export const contractInfo = {
    contractAddress: "0x06aBF0459f4780C6F80651fB089F42A605fF6593",
    abi: [
        {
            "inputs": [
                {
                    "internalType": "string[]",
                    "name": "proposalNames",
                    "type": "string[]"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [],
            "name": "chairperson",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                }
            ],
            "name": "delegate",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "voter",
                    "type": "address"
                }
            ],
            "name": "giveRightToVote",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "proposals",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "voteCount",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "proposal",
                    "type": "uint256"
                }
            ],
            "name": "vote",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "voters",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "weight",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "voted",
                    "type": "bool"
                },
                {
                    "internalType": "address",
                    "name": "delegate",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "vote",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "winnerName",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "winnerName_",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "winningProposal",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "winningProposal_",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ],
    endPoint:"xxxxx"
};
```
