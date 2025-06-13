import { useEffect, useState } from "react";
import { getConverter, getCountryFlag, getCoinCode } from "./api/requests";

import Select from "react-select";

import "./App.css";
import { HiArrowsRightLeft } from "react-icons/hi2";

function App() {
  const [conversion, setConversion] = useState<number | null>(null);
  const [coins, setCoins] = useState<
    { code: string; flag: string | undefined }[]
  >([]);
  const [coinPrimary, setCoinPrimary] = useState<string>("");
  const [coinSecundary, setCoinSecundary] = useState<string>("");
  const [amount, setAmount] = useState<number>(1);

  const handleConversion = async (from: string, to: string, amount: number) => {
    try {
      const conversion = await getConverter(from, to, amount);

      setConversion(conversion);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReverse = () => {
    setCoinPrimary(coinSecundary);
    setCoinSecundary(coinPrimary);
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

    console.log(amount);

    handleCoinsAndFlags();
  }, []);

  useEffect(() => {
    if (!coinPrimary || !coinSecundary) return;

    if (coinPrimary == coinSecundary) return setConversion(amount);

    if (amount == 0 || amount == undefined) return setConversion(0);

    handleConversion(coinPrimary, coinSecundary, amount);
  }, [coinPrimary, coinSecundary, amount]);

  useEffect(() => {
    if (coins.length > 0) {
      setCoinPrimary(coins[29]?.code);
      setCoinSecundary(coins[2]?.code);
    }
  }, [coins]);

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
          <p>Conversor de Moedas</p>
        </div>
        <div className="conversion-text">
          <p>
            {amount} {coinPrimary} igual a {conversion?.toFixed(2)}{" "}
            {coinSecundary}
          </p>
        </div>
        <div className="container-select">
          <div className="select-primary">
            <input
              className="input"
              type="number"
              defaultValue={1}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <Select
              options={options}
              value={options.find((option) => option.value === coinPrimary)}
              className="select"
              classNamePrefix="my"
              onChange={(selectedOption) =>
                setCoinPrimary(selectedOption?.value || "")
              }
            />
          </div>
          <HiArrowsRightLeft className="icon-arrows" onClick={handleReverse} />
          <div className="select-secundary">
            <input
              className="input"
              type="number"
              value={conversion?.toFixed(2) || ""}
              readOnly
            />
            <Select
              options={options}
              value={options.find((option) => option.value === coinSecundary)}
              className="select"
              onChange={(selectedOption) =>
                setCoinSecundary(selectedOption?.value || "")
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
