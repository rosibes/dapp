import { useState, useEffect } from "react";
import axios from "axios";

const useETHPrice = () => {
  const [price, setPrice] = useState(null);  // Stocăm prețul ETH
  const [loading, setLoading] = useState(true);  // Starea de încărcare
  const [error, setError] = useState(null);    // Starea pentru erori

  useEffect(() => {
    const fetchETHPrice = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        );
        setPrice(response.data.ethereum.usd); // Setăm prețul ETH
      } catch (err) {
        setError("Failed to fetch ETH price");
      } finally {
        setLoading(false);
      }
    };

    fetchETHPrice();
    const interval = setInterval(fetchETHPrice, 60000);  // Actualizează prețul la fiecare 60 secunde

    return () => clearInterval(interval);  // Curăță intervalul când componenta se demontează
  }, []);

  return { price, loading, error };
};

export default useETHPrice;
