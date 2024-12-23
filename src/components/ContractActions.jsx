import React, { useState } from "react";
import { depositFund } from "../utils/contractServices";
import { withdrawFund } from "../utils/contractServices";
import { toast } from "react-toastify";

function ContractActions() {
  const [depositValue, setDepositValue] = useState("");

  const handleDeposit = async () => {
    if (isNaN(depositValue) || parseFloat(depositValue) <= 0) {
      toast.error("Te rugăm să introduci o valoare validă pentru depunere.");
      return;
  }
    try {
      await depositFund(depositValue);
    } catch (error) {
      toast.error(error?.reason);
    }
    setDepositValue("");
  };

  const handleWithdraw = async () => {
    try {
      await withdrawFund();
    } catch (error) {
      toast.error(error?.reason);
    }
  };

  return (
    <div>
      <h2>Contract Actions</h2>
      <div>
        <input
          type="text"
          value={depositValue}
          onChange={(e) => setDepositValue(e.target.value)}
          placeholder="Amount in ETH"
        />
        <button onClick={handleDeposit}>Deposit Funds</button>
      </div>
      <br />
      <div>
        <button onClick={handleWithdraw}>Withdraw Funds</button>
      </div>
    </div>
  );
}

export default ContractActions;