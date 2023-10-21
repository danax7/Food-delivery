import { AddressObject } from "@/pages/RegistrationPage/components/RegistrationForm/RegistrationForm";
import { useState } from "react";

const useAddressChain = (
  fetchData: (url: string, callback: (data: any) => void) => void
) => {
  const [addressChain, setAddressChain] = useState<AddressObject[]>([]);
  const [buildingId, setBuildingId] = useState<string>("");

  const handleAddressChange = async (objectId: string, chainIndex: number) => {
    fetchData(
      `https://food-delivery.kreosoft.ru/api/address/search?parentObjectId=${objectId}`,
      (data) => {
        setAddressChain((prevChain) => prevChain.slice(0, chainIndex + 1));
        setAddressChain((prevChain) => [...prevChain, data]);
        setBuildingId(objectId);
      }
    );
  };

  return { addressChain, buildingId, handleAddressChange };
};

export default useAddressChain;
