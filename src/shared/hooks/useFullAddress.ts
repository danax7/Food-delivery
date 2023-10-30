import { useEffect, useState } from "react";
import axios from "axios";

export const useFullAddress = (addressGUID: string | null) => {
  const [fullAddress, setFullAddress] = useState<string>("");

  useEffect(() => {
    const fetchAddressChain = async () => {
      try {
        if (addressGUID) {
          const response = await axios.get(
            `https://food-delivery.kreosoft.ru/api/address/getaddresschain?objectGuid=${addressGUID}`
          );
          if (response.data) {
            const addressChain = response.data.map(
              (addressObj) => addressObj.text
            );
            const formattedAddress = addressChain.join(", ");
            setFullAddress(formattedAddress);
          }
        }
      } catch (error) {
        console.error("Failed to fetch address chain:", error);
      }
    };

    fetchAddressChain();
  }, [addressGUID]);

  return fullAddress;
};
