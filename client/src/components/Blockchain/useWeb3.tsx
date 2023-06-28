import { useState, useEffect } from "react";
import Web3 from "web3";

declare global {
  interface Window {
    ethereum: any;
  }
}

export const useWeb3 = (abi: any, contractAddress: string) => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [contract, setContract] = useState<any | null>(null);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
        } catch (err) {
          console.log("User cancelled");
          console.log(err);
        }
        const contractInstance = new web3Instance.eth.Contract(
          abi,
          contractAddress
        );
        setWeb3(web3Instance);
        setContract(contractInstance);
      } else {
        alert("Please install MetaMask to use this dApp!");
      }
    };

    initWeb3();
  }, [abi, contractAddress]);

  return { web3, contract };
};

export function encodeIdToBase36(Id: any) {
  let stringId = parseInt(Id).toString(36).toUpperCase();
  stringId = stringId.padStart(12, "Z");
  return stringId;
}

export function decodeStringId(stringId: string) {
  stringId = stringId.replace(/^Z+/, "");
  return parseInt(stringId, 36);
}
