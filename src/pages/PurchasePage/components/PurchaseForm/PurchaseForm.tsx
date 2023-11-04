import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import s from "./PurchaseForm.module.scss";
import UserData from "../UserData/UserData";
import PurchaseItemList from "../PurchaseItemsList/PurchaseItemList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddressForm from "@/shared/components/AddressForm/AddressForm";

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
          new Date(Date.now() + 60 * 60 * 1000),
          "Время доставки должно быть на 60 минут больше текущего времени"
        ),
      addressId: Yup.string().required("Required"),
    }),

    onSubmit: async (values) => {
      function formatDeliveryTime(date) {
        const localDate = new Date(date);
        localDate.setHours(localDate.getHours() + 0);
        const utcDate = new Date(
          localDate.getTime() - localDate.getTimezoneOffset() * 60000
        );
        return utcDate.toISOString();
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
        toast.success("Заказ успешно размещен!");
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
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
        />
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

      <AddressForm
        formik={formik}
        onGUIDChange={handleGUIDChange}
        text={"Выбрать адрес"}
      />
      <PurchaseItemList />
      <button onClick={() => console.log(formik.errors, GUID)} type="submit">
        Оформить заказ
      </button>
    </form>
  );
};

export default PurchaseForm;
