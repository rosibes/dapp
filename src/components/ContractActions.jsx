import React, { useState } from "react";
import { depositFund, transferETH } from "../utils/contractServices";
import { toast } from "react-toastify";

function ContractActions() {
  const [depositValue, setDepositValue] = useState("");
  const [recipient, setRecipient] = useState("");
  const [transferValue, setTransferValue] = useState("");
  const [showDepositSection, setShowDepositSection] = useState(false);
  const [showTransferSection, setShowTransferSection] = useState(false);

  const handleDeposit = async () => {
    if (isNaN(depositValue) || parseFloat(depositValue) <= 0) {
      toast.error("Te rugăm să introduci o valoare validă pentru depunere.");
      return;
    }
    try {
      await depositFund(depositValue);
    } catch (error) {
      toast.error(error?.reason || "A apărut o eroare la depunere.");
    }
    setDepositValue("");
    setShowDepositSection(false);
  };

  const handleTransfer = async () => {
    if (!recipient || !transferValue) {
      toast.error("Te rugăm să introduci adresa destinatarului și valoarea!");
      return;
    }
    if (isNaN(transferValue) || parseFloat(transferValue) <= 0) {
      toast.error("Te rugăm să introduci o valoare validă pentru transfer.");
      return;
    }

    try {
      await transferETH(recipient, transferValue);
    } catch (error) {
      toast.error(error?.reason || "A apărut o eroare în timpul transferului.");
    }
    setRecipient("");
    setTransferValue("");
    setShowTransferSection(false);
  };

  return (
    <div className="bg-slate-900 text-white flex flex-col items-center p-4">
      <div className="flex justify-center gap-4 w-full max-w-lg mb-6">
        <button
          className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-semibold text-xl hover:bg-blue-900 transition duration-300"
          onClick={() => {
            setShowTransferSection(true);
            setShowDepositSection(false);
          }}
        >
          Transfer Funds
        </button>
        <button
          className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-semibold text-xl hover:bg-blue-900 transition duration-300"
          onClick={() => {
            setShowDepositSection(true);
            setShowTransferSection(false);
          }}
        >
          Deposit Funds
        </button>
      </div>

      {/* Transfer Section */}
      {showTransferSection && (
        <div className="flex flex-col justify-center items-center w-full max-w-lg rounded-lg shadow-lg p-6 mb-6 bg-slate-800">
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Recipient Address"
            className="w-full max-w-md px-4 py-2 border rounded-lg text-gray-800 mb-4"
          />
          <input
            type="text"
            value={transferValue}
            onChange={(e) => setTransferValue(e.target.value)}
            placeholder="Amount in ETH"
            className="w-full max-w-md px-4 py-2 border rounded-lg text-gray-800 mb-4"
          />
          <button
            className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-green-900 transition duration-300"
            onClick={handleTransfer}
          >
            Send ETH
          </button>
        </div>
      )}

      {/* Deposit Section */}
      {showDepositSection && (
        <div className="flex flex-col justify-center items-center w-full max-w-lg rounded-lg shadow-lg p-6 mb-6 bg-slate-800">
          <input
            type="text"
            value={depositValue}
            onChange={(e) => setDepositValue(e.target.value)}
            placeholder="Amount in ETH"
            className="w-full max-w-md px-4 py-2 border rounded-lg text-gray-800 mb-4"
          />
          <button
            className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-green-900 transition duration-300"
            onClick={handleDeposit}
          >
            Confirm Deposit
          </button>
        </div>
      )}
    </div>
  );
}

export default ContractActions;
