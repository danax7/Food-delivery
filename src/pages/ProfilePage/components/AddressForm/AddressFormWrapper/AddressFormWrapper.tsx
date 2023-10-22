import React, { useEffect } from "react";
import axios from "axios";
import AddressForm from "../AddressForm";
import s from "./ProfileForm.module.scss";

const AddressFormWrapper = ({
  addressFields,
  formik,
  addressChain,
  setAddressChain,
  setObjectIdd,
  GUID,
}) => {
  useEffect(() => {
    const fetchAddressChain = async () => {
      try {
        const response = await axios.get(
          `https://food-delivery.kreosoft.ru/api/address/getaddresschain?objectGuid=${GUID}`
        );
        if (response.data) {
          setAddressChain(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch address chain:", error);
      }
    };

    if (GUID) {
      fetchAddressChain();
    }
  }, [GUID]);

  const handleAddressChange = async (objectId, chainIndex) => {
    const response = await axios.get(
      `https://food-delivery.kreosoft.ru/api/address/search?parentObjectId=${objectId}`
    );

    if (response.data) {
      setAddressChain((prevChain) => prevChain.slice(0, chainIndex + 1));
      setAddressChain((prevChain) => [...prevChain, response.data]);
      setObjectIdd(objectId);
    }
  };

  return (
    <AddressForm
      addressFields={addressFields}
      formik={formik}
      addressChain={addressChain}
      handleAddressChange={handleAddressChange}
    />
  );
};

export default AddressFormWrapper;
