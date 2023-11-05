import React, { useEffect, useState } from "react";
import s from "./AddressForm.module.scss";
import axios from "axios";
import Select from "react-select";
const AddressForm = ({ formik, onGUIDChange, text }) => {
  const [addressFields, setAddressFields] = useState<string[]>([]);
  const [addressChain, setAddressChain] = useState<string[]>([]);
  const [GUID, setGUID] = useState<string>("");
  const [objectIdd, setObjectIdd] = useState<string>("");

  const fetchData = async (url, callback) => {
    try {
      const response = await axios.get(url);
      callback(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData(
      "https://food-delivery.kreosoft.ru/api/address/search?parentObjectId=0",
      setAddressFields
    );
    handleAddressChange("0", 0);
  }, []);

  useEffect(() => {
    if (
      addressChain.length > 2 &&
      addressChain[addressChain.length - 1].length === 0
    ) {
      const previousChain = addressChain[addressChain.length - 2];

      const guid = previousChain.find((item) => item.objectId == objectIdd!)!
        .objectGuid!;
      console.log("guid addressForm", guid);

      setGUID(guid);
      onGUIDChange(guid);
    }
  }, [addressChain, objectIdd]);

  const handleAddressChange = async (
    objectId: string,
    chainIndex: number,
    text?: string
  ) => {
    const response = await axios.get(
      `https://food-delivery.kreosoft.ru/api/address/search?parentObjectId=${objectId}&query=${
        text || ""
      }`
    );

    if (response.data) {
      setAddressChain((prevChain) => prevChain.slice(0, chainIndex + 1));
      setAddressChain((prevChain) => [...prevChain, response.data]);
      setObjectIdd(objectId);
    }
  };

  return (
    <div className={s.addressChain}>
      <h3>{text ? text : "Изменить адрес"}</h3>

      {addressChain.map((chain, chainIndex) => (
        <div key={chainIndex} className={s.formItem}>
          <label htmlFor={`level${chainIndex}`}>
            {chain[0]?.objectLevelText}
          </label>
          {chain.length > 0 && (
            <Select
              className={s.select}
              id={`level${chainIndex}`}
              name={`level${chainIndex}`}
              options={chain.map((field) => ({
                value: field.objectId,
                label: field.text,
              }))}
              onChange={(selectedOption) => {
                const selectedObjectId = selectedOption.value;
                formik.setFieldValue(`level${chainIndex}`, selectedObjectId);
                handleAddressChange(selectedObjectId, chainIndex);
              }}
              onBlur={formik.handleBlur}
              value={
                formik.values[`level${chainIndex}`]
                  ? {
                      value: formik.values[`level${chainIndex}`],
                      label: chain.find(
                        (field) =>
                          field.objectId === formik.values[`level${chainIndex}`]
                      )?.text,
                    }
                  : null
              }
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default AddressForm;
