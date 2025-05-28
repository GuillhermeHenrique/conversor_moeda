import { useEffect, useState } from "react";
import { getConverter, getCountryFlag, getCoinCode } from "./api/requests";

import "./App.css";
import Select from "react-select";
import { GoArrowSwitch } from "react-icons/go";

function App() {
  const [conversion, setConversion] = useState<number | null>(null);
  const [coins, setCoins] = useState<{ code: string; flag: string }[]>([]);
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
    const handleCoinsAndFlags = async () => {
      try {
        const coinData = await getCoinCode();
        const codes = Object.keys(coinData);

        const flags = await Promise.all(
          codes.map((code) => getCountryFlag(code))
        );

        const combined = codes.map((code, index) => ({
          code,
          flag: flags[index],
        }));

        setCoins(combined);
      } catch (error) {
        console.log(error);
      }
    };

    handleCoinsAndFlags();
  }, []);

  const options = coins.map((coin) => ({
    value: coin.code,
    label: (
      <div key={coin.code} className="option">
        <img src={coin.flag} alt={coin.code} className="image-select" />
        {coin.code}
      </div>
    ),
  }));

  return (
    <div className="App">
      <div className="container">
        <div className="title">
          <p>Conversor de Moeda</p>
        </div>
        <div className="container-select">
          <Select
            options={options}
            className="select"
            classNamePrefix="my"
            onChange={(selectedOption) =>
              setCoinPrimary(selectedOption?.value || "")
            }
            placeholder="Moeda Primária"
          />
          {/* 1 input */}
          <GoArrowSwitch className="icon-arrows" />
          <Select
            options={options}
            className="select"
            classNamePrefix="my"
            onChange={(selectedOption) =>
              setCoinSecundary(selectedOption?.value || "")
            }
            placeholder="Moeda Secundária"
          />
        </div>
        {/* 2 input */}
        <button
          type="submit"
          onClick={() => handleConversion(coinPrimary, coinSecundary)}
        >
          Calcular
        </button>
        {conversion && <h2>{conversion.toFixed(2)}</h2>}
      </div>
    </div>
  );
}

export default App;
