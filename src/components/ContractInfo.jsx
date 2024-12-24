import React, { useEffect, useState } from "react";
import { FaEthereum } from "react-icons/fa"; // Importă Ethereum icon
import { getContractBalanceInETH } from "../utils/contractServices";
import useETHPrice from "../hooks/useETHPrice";
import { CopyToClipboard } from "react-copy-to-clipboard"; // Importăm funcționalitatea de copiere
import { FaCopy } from "react-icons/fa"; // Importăm logo-ul de copiere



function ContractInfo({ account, handleLogout }) {
  const [balance, setBalance] = useState(null);
  const { price, loading, error } = useETHPrice(); // Obținem prețul ETH
  const [copied, setCopied] = useState(false); // State pentru mesajul "copied"


  useEffect(() => {
    const fetchBalance = async () => {
      const balanceInETH = await getContractBalanceInETH();
      setBalance(balanceInETH);
    };
    fetchBalance();
  }, []);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000); // Mesajul dispare după 1 secunde
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Caseta cu EtherFlow și Logout */}
      <div className="w-full bg-slate-800 rounded-xl px-8 py-4 flex justify-between items-center mb-4">
        <div className="flex justify-row items-center">
      <FaEthereum className="text-white w-10 h-10" />
        <p className="text-white text-2xl font-semibold">EtherFlow</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-md"
        >
          Logout
        </button>
      </div>

         {/* Afișează prețul Ethereum */}
         <div className="flex justify-center mb-3">
         <div className="text-white text-lg mt-4">
          {loading ? (
            <p>Loading ETH price...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <p className="text-white text-2xl font-semibold">Current ETH Price: ${price}</p>
          )}
        </div>
        </div>

      {/* Caseta cu soldul și contul */}
      <div className="w-full text-center mb-10 px-20">
        <div className="flex justify-center items-center space-x-2 mb-2">
          
          <h2 className="text-white text-7xl font-semibold">{balance} ETH</h2>
          {/* Aici este logo-ul ETH din react-icons */}
          <FaEthereum className="text-white w-10 h-10" />
        </div>
    {/* Adresa contractului și logo-ul de copiere */}
        <div className="flex justify-center items-center space-x-2">
          <p className="text-white">{account}</p>
     {/* Logo-ul de copiere */}
     <CopyToClipboard text={account} onCopy={handleCopy}>
            <button className="text-white">
              <FaCopy className="w-6 h-6 text-white-500 hover:text-blue-400 cursor-pointer" />
            </button>
          </CopyToClipboard>
        </div>
      {/* Mesajul "copied" */}
      {copied && (
          <div className="mt-4 text-green-500 font-semibold">
            <p>Copied to clipboard!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContractInfo;
