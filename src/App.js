import Web3 from "web3";
import React, { useEffect, useState } from "react";

function App() {
  const [web3Instance, setWeb3Instance] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [manager, setManager] = useState("");

  const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const abi = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "enter",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "getPlayers",
      outputs: [
        {
          internalType: "address[]",
          name: "",
          type: "address[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "manager",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "pickWinner",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "players",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  useEffect(() => {
    const loadWeb3AndData = async () => {
      if (window.ethereum) {
        console.log("Ethereum provider detected");
        try {
          // Initialize Web3 instance
          const web3 = new Web3(window.ethereum);
          setWeb3Instance(web3);

          // Request accounts
          const userAccounts = await window.ethereum.request({ method: "eth_requestAccounts" });
          setAccounts(userAccounts);

          // Initialize contract
          const lotteryContract = new web3.eth.Contract(abi, address);

          // Fetch manager address
          const managerAddress = await lotteryContract.methods.manager().call();
          setManager(managerAddress);

          console.log("Manager address:", managerAddress);
        } catch (error) {
          console.error("Error initializing Web3 or accessing accounts:", error);
        }
      } else {
        console.log("No Ethereum provider found. Install MetaMask.");
      }
    };

    loadWeb3AndData();
  }, []);

  return (
    <div>
      <h1>React Web3 App</h1>
      <h2>Ethereum Accounts:</h2>
      <p>{accounts.length > 0 ? accounts.join(", ") : "No accounts detected"}</p>
      <h2>Manager Address:</h2>
      <p>{manager || "Loading manager address..."}</p>
    </div>
  );
}

export default App;
