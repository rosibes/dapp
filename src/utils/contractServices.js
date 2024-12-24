import Lock_ABI from "./Lock_ABI.json";
import {BrowserProvider, Contract, parseEther, formatEther } from "ethers";
import { CONTRACT_ADDRESS } from "./constants"
import { toast } from 'react-toastify';

/**
 * Configurează conexiunea cu blockchain-ul.
 * Interacționează cu contractul inteligent prin funcții precum:
 *  Obținerea contului conectat.
    Verificarea balanței contractului.
    Depunerea și retragerea fondurilor.
 */


let provider;       //Legătura dintre aplicație și blockchain.
let signer;         //Contul utilizatorului care semnează tranzacțiile.
let contract;       // Instanța contractului inteligent cu care interacționează aplicația.

// Function to initailize the provider, signer, and contract
const initialize = async () => {
    if(typeof window.ethereum !== "undefined") {       //verifica daca MetaMask(sau alt provider) este instalat
        provider = new BrowserProvider(window.ethereum);   //Creează un nou provider folosind obiectul MetaMask din browser.
        signer = await provider.getSigner();    //obtine contul conectat curent
        contract = new Contract(CONTRACT_ADDRESS, Lock_ABI, signer);    //creaza o instanta a contractului inteligent folosind adresa, ABI-ul si signerul
                                                        // Lock_Abi Descrie funcțiile și structura contractului (e ca un "manual de operare" pt contract).

    }else{
        console.error("Please install Metamask")
        toast.error("Please install MetaMask")
    }
};



// Initialize once when the module is loaded
initialize();

// Function to request single account
export const requestAccount = async () => {
    try {
      if (!provider) {
        console.error("Provider nu este setat. Asigură-te că MetaMask este instalat și activ.");
        toast.error("Asigură-te că MetaMask este instalat și activ.")
        return null; // Nu returna nimic dacă provider-ul nu este setat
      }
      const accounts = await provider.send("eth_requestAccounts", []); // Solicită lista conturilor
      return accounts[0]; // Returnează primul cont
    } catch (error) {
      console.error("Eroare la solicitarea contului:", error.message);
      return null;
    }
  };
  

// Function to get contract balance in ETH
export const getContractBalanceInETH = async () => {
    const balanceWei = await provider.getBalance(CONTRACT_ADDRESS);     //Obține balanța contractului în Wei 
    const balanceEth = formatEther(balanceWei); // Convert Wei to ETH string
    return balanceEth; // Convert ETH string to number
  };

// Function to deposit funds to the contract
export const depositFund = async (depositValue) => {
    try {
        const ethValue = parseEther(depositValue); // Converti valoarea ETH în Wei
        const deposit = await contract.deposit({ value: ethValue }); // Trimite valoarea către contract
        await deposit.wait(); // Așteaptă ca tranzacția să fie procesată
    } catch (error) {
        console.error("Error during deposit: ", error.message);
        console.log("Eroare: ", error.message);

        // Verifică dacă eroarea este legată de lipsa fondurilor
        if (error.message.includes("missing revert data")) {
            toast.error("Nu ai suficiente fonduri pentru a acoperi taxele de gaz!");
        } else {
            toast.error("A apărut o eroare la depunerea fondurilor.");
        }
    }
};


// Function to withdraw funds from the contract
export const withdrawFund = async () =>{
    const withdrawTx = await contract.withdraw();       //(contract e in Lock.sol)
    await withdrawTx.wait();
    console.log("Withdrawal succesful!");
};


//Function to transfer ETH to another address
export const transferETH = async (recipientAdress, ethValue) => {

  try {
    const ethValueInWei = parseEther(ethValue); //Convert ETH to Wei
    const transferTx = await contract.transferEthTo(recipientAdress, ethValueInWei); // Call the smart contract function
    await transferTx.wait();
    toast.success(`Successfully transferred ${ethValue} ETH to ${recipientAdress}`);
  } catch (error){
    console.error("Error during ETH transfer: ", error.message);
    if (error.message.includes("insufficient funds")) {
        toast.error("Fonduri insuficiente pentru transfer!");
    } else {
        toast.error("A apărut o eroare în timpul transferului.");
    }
  }
};

