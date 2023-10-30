import React, { useEffect, useState } from "react";
import s from "./PurchaseAddressForm.module.scss";
import axios from "axios";
const PurchaseAddressForm = ({ formik, onGUIDChange }) => {
  const [addressFields, setAddressFields] = useState<any[]>([]);
  const [addressChain, setAddressChain] = useState<any[]>([]);
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

  const handleAddressChange = async (objectId: string, chainIndex: number) => {
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
    <div className={s.addressChain}>
      <h3>Адрес Доставки</h3>

      <div className={s.formItem}>
        <label htmlFor="address">Субъект РФ</label>
        <select
          id="address"
          name="address"
          onChange={(e) => {
            const selectedObjectId = e.target.value;
            formik.handleChange(e);
            handleAddressChange(selectedObjectId, 0);
          }}
          onBlur={formik.handleBlur}
          value={formik.values.address || ""}
        >
          <option value="" label="Регион"></option>
          {addressFields.map((field, index) => (
            <option key={index} value={field.objectId}>
              {field.text}
            </option>
          ))}
        </select>
        {formik.touched.address && formik.errors.address ? (
          <div>{formik.errors.address}</div>
        ) : null}
      </div>

      {addressChain.map((chain, chainIndex) => (
        <div key={chainIndex} className={s.formItem}>
          <label htmlFor={`level${chainIndex}`}>
            {chain[0]?.objectLevelText}
          </label>
          {chain.length > 0 && (
            <select
              id={`level${chainIndex}`}
              name={`level${chainIndex}`}
              onChange={(e) => {
                const selectedObjectId = e.target.value;
                formik.handleChange(e);
                handleAddressChange(selectedObjectId, chainIndex);
              }}
              onBlur={formik.handleBlur}
              value={formik.values[`level${chainIndex}`] || ""}
            >
              {chainIndex === addressChain.length - 1 ? (
                <option value="" label=""></option>
              ) : null}
              {chain.map((field, index) => (
                <option key={index} value={field.objectId}>
                  {field.text}
                </option>
              ))}
            </select>
          )}
        </div>
      ))}
    </div>
  );
};
export default PurchaseAddressForm;
