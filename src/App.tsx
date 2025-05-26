import { useEffect, useState } from "react";
import { getConverter, getCountryFlag, getCoinCode } from "./api/requests";

import "./App.css";

function App() {
  const [conversion, setConversion] = useState<number | null>(null);
  const [flags, setFlags] = useState<string[]>([]);
  const [coinCode, setCoinCode] = useState<string[]>([]);
  const [coinPrimary, setCoinPrimary] = useState<string>("");
  const [coinSecundary, setCoinSecundary] = useState<string>("");

  const handleConversion = async (from: string, to: string) => {
    try {
      const conversion = await getConverter(from, to);

      setConversion(conversion);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleCoinCode = async () => {
      try {
        const coinData = await getCoinCode();

        const key = Object.keys(coinData).slice(0, 30);

        setCoinCode(key);
      } catch (error) {
        console.log(error);
      }
    };

    handleCoinCode();
  }, []);

  useEffect(() => {
    const handleFlags = async () => {
      try {
        if (coinCode.length > 0) {
          const countryFlags = await Promise.all(
            coinCode.map((code) => getCountryFlag(code))
          );

          setFlags(countryFlags);
        }
      } catch (error) {
        console.log(error);
      }
    };

    handleFlags();
  }, [coinCode]);

  return (
    <div className="App">
      <select onChange={(e) => setCoinPrimary(e.target.value)}>
        {coinCode?.map((coin) => (
          <option key={coin} value={coin}>
            {coin}
          </option>
        ))}
      </select>
      <select onChange={(e) => setCoinSecundary(e.target.value)}>
        {coinCode?.map((coin) => (
          <option key={coin} value={coin}>
            {coin}
          </option>
        ))}
      </select>
      <button
        type="submit"
        onClick={() => handleConversion(coinPrimary, coinSecundary)}
      >
        Calcular
      </button>
      <h2>{conversion}</h2>
      <div>
        {flags?.map((flag, index) => (
          <img key={index} src={flag} alt="flag" />
        ))}
      </div>
    </div>
  );
}

export default App;
