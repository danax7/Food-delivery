import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import s from "./PurchaseForm.module.scss";
import PurchaseAddressForm from "../PurchaseAddressForm/PurchaseAddressForm";
import UserData from "../UserData/UserData";
import PurchaseItemList from "../PurchaseItemsList/PurchaseItemList";
const PurchaseForm = () => {
  const [GUID, setGUID] = useState("");

  const formik = useFormik({
    initialValues: {
      deliveryTime: "",
      addressId: "",
    },
    validationSchema: Yup.object({
      deliveryTime: Yup.date()
        .required("Required")
        .min(
          new Date(Date.now() + 50 * 60 * 1000), // текущее время + 50 минут в миллисекундах
          "Время доставки должно быть на 50 минут больше текущего времени"
        ),
      addressId: Yup.string().required("Required"),
    }),

    onSubmit: async (values) => {
      function formatDeliveryTime(date) {
        const formattedDate = new Date(date).toISOString();
        return formattedDate;
      }
      try {
        const orderData = {
          deliveryTime: formatDeliveryTime(values.deliveryTime),
          addressId: GUID,
        };

        await axios.post(
          "https://food-delivery.kreosoft.ru/api/order",
          orderData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log("Order placed successfully:", orderData);
      } catch (error) {
        console.error("Failed to place order:", error);
      }
    },
  });

  const handleGUIDChange = (guid: string) => {
    setGUID(guid);
    formik.setFieldValue("addressId", guid);
    console.log("guid", guid);
  };

  return (
    <form onSubmit={formik.handleSubmit} className={s.form}>
      <div className={s.formWrapper}>
        <UserData />
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
      <PurchaseItemList />
      <button
        onClick={() =>
          console.log(formik.errors, GUID, formik.values.deliveryTime)
        }
        type="submit"
      >
        Оформить заказ
      </button>
    </form>
  );
};

export default PurchaseForm;
