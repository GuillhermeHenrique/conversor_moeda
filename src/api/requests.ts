import axios from "axios";
// import { useFlagResponse } from "../hooks/useFlags";

export const getConverter = async (
  from: string,
  to: string,
  amount: number
) => {
  try {
    const response = await axios.get(
      `https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}&amount=${amount}`
    );

    return response.data.rates[to];
  } catch (error) {
    console.log(error);
  }
};

export const getCountryFlag = async (countryCoin: string) => {
  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/currency/${countryCoin}`
    );

    // useFlagResponse(countryCoin);

    return response.data[0].flags.png;
  } catch (error) {
    console.log(error);
  }
};

export const getCoinCode = async () => {
  try {
    const response = await axios.get(
      `https://api.frankfurter.dev/v1/latest?base=ZAR`
    );

    return response.data.rates;
  } catch (error) {
    console.log(error);
  }
};
