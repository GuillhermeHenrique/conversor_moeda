import axios from "axios";

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

    let data = "";

    switch (countryCoin) {
      case "USD":
        data = "https://www.gov.br/agricultura/pt-br/assuntos/relacoes-internacionais/agro-mais-investimentos/imagens/bandeira-dos-estados-unidos.png/@@images/image.png";
        break;
      case "EUR":
        data = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/800px-Flag_of_Europe.svg.png";
        break;
      case "AUD":
        data = "https://imagepng.org/bandeira-da-australia/bandeira-australia/";
        break;
      default:
        data = response.data[0].flags.png;
    }

    return data;
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
