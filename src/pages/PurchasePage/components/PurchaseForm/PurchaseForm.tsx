import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import s from "./PurchaseForm.module.scss";
import PurchaseAddressForm from "../PurchaseAddressForm/PurchaseAddressForm";
const PurchaseForm = () => {
  const [deliveryTime, setDeliveryTime] = useState("");
  const [GUID, setGUID] = useState("");

  const formik = useFormik({
    initialValues: {
      deliveryTime: "",
      addressId: "",
    },
    validationSchema: Yup.object({
      deliveryTime: Yup.string().required("Required"),
      addressId: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const orderData = {
          deliveryTime: values.deliveryTime,
          addressId: GUID,
        };

        await axios.post(
          "https://food-delivery.kreosoft.ru/api/order",
          orderData
        );

        console.log("Order placed successfully:", orderData);
      } catch (error) {
        console.error("Failed to place order:", error);
      }
    },
  });

  const handleGUIDChange = (guid: string) => {
    setGUID(guid);
    console.log("guid", guid);
  };
  return (
    <form onSubmit={formik.handleSubmit} className={s.form}>
      <div className={s.formWrapper}>
        <div className={s.formItem}>
          <label htmlFor="deliveryTime">Выберите время доставки:</label>
          <input
            type="datetime-local"
            id="deliveryTime"
            name="deliveryTime"
            value={formik.values.deliveryTime}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.deliveryTime && formik.errors.deliveryTime ? (
            <div>{formik.errors.deliveryTime}</div>
          ) : null}
        </div>
      </div>

      <PurchaseAddressForm formik={formik} onGUIDChange={handleGUIDChange} />

      <button type="submit">Оформить заказ</button>
    </form>
  );
};

export default PurchaseForm;
