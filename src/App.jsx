import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { requestAccount } from "./utils/contractServices";
import ConnectWalletButton from "./components/ConnectWalletButton";
import ContractInfo from "./components/ContractInfo";
import ContractActions from "./components/ContractActions";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [account, setAccount] = useState(null); // pentru a ține cont de adresa portofelului conectat
  const [provider, setProvider] = useState(null); // providerul de Ethereum (MetaMask)

  useEffect(() => {
    // Verifică dacă un cont este deja conectat atunci când aplicația este încărcată
    const fetchCurAccount = async () => {
      const account = await requestAccount(provider); // Solicită contul curent
      if (account) {
        setAccount(account); // Setează contul dacă există
      }
    };

    if (provider) {
      fetchCurAccount();
    }
  }, [provider]); // Încearcă din nou doar dacă provider-ul se schimbă

  useEffect(() => {
    // Ascultă schimbările de cont în MetaMask (de exemplu, dacă utilizatorul schimbă contul)
    const handleAccountChanged = (newAccounts) => {
      setAccount(newAccounts.length > 0 ? newAccounts[0] : null);
    };

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountChanged); // Ascultă schimbările de cont
    }

    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountChanged); // Curăță ascultătorul la demontarea componentei
    };
  }, []);

  // Funcția de deconectare (resetarea contului)
  const handleLogout = () => {
    setAccount(null); // Resetează contul din starea aplicației
    setProvider(null); // Resetează providerul
  };

  return (
    <div className="app">
      <ToastContainer />
      {!account ? (
        <ConnectWalletButton setAccount={setAccount} setProvider={setProvider} />
      ) : (
        <div className="contract-interactions">
          <ContractInfo account={account} />
          <ContractActions />
          <button onClick={handleLogout}>Logout</button> {/* Buton de logout */}
        </div>
      )}
    </div>
  );
}

export default App;
