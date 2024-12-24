import React from "react";
import { requestAccount } from "../utils/contractServices";

function ConnectWalletButton({ setAccount, setProvider }) {
  const connectWallet = async () => {
    try {
      const account = await requestAccount(setProvider); // Setează provider-ul la conectare
      if (account) {
        setAccount(account); // Setează contul conectat
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  return <div className="bg-custom-blue h-screen flex justify-center items-center">
   <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-lg hover:bg-blue-900 transition duration-300"

   onClick={connectWallet}>Connect Web3 Wallet</button>;
   </div>
}

export default ConnectWalletButton;
