import { useState } from "react";

export const useFlagResponse = (countryCoin: string) => {
  const [response, setResponse] = useState<string>(
    "response.data[0].flags.png"
  );

  switch (countryCoin) {
    case "USD":
      setResponse("response.data[10].flags.png");
      return response;
  }
};
