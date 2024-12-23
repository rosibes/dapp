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

  return <button onClick={connectWallet}>Connect Web3 Wallet</button>;
}

export default ConnectWalletButton;
