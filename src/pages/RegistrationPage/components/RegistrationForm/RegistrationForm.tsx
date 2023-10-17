import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RegistrationForm = () => {
  const [addressFields, setAddressFields] = useState<string[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      gender: "Male",
      phoneNumber: "",
      address: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Required"),
      gender: Yup.string().required("Required"),
      phoneNumber: Yup.string()
        .matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, "Invalid phone number")
        .required("Required"),
      address: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post("/api/account/register", values);
        console.log("Registration successful. Token:", response.data.token);
      } catch (error) {
        console.error("Registration failed:", error);
      }
    },
  });

  useEffect(() => {
    const fetchAddressFields = async () => {
      try {
        const response = await axios.get(
          "https://food-delivery.kreosoft.ru/api/address/search?parentObjectId=0"
        );
        const subjects = response.data.map((item: any) => item.text);
        setAddressFields(subjects);
      } catch (error) {
        console.error("Failed to fetch address fields:", error);
      }
    };

    fetchAddressFields();
  }, []); //

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="fullName">Full Name:</label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.fullName}
        />
        {formik.touched.fullName && formik.errors.fullName ? (
          <div>{formik.errors.fullName}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          name="gender"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.gender}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        {formik.touched.gender && formik.errors.gender ? (
          <div>{formik.errors.gender}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          id="phoneNumber"
          name="phoneNumber"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phoneNumber}
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
          <div>{formik.errors.phoneNumber}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="dob">Дата рождения:</label>
        <DatePicker
          id="dob"
          name="dob"
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            formik.setFieldValue("dob", date);
          }}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div>
        <label htmlFor="address">Субъект РФ</label>
        <select
          id="address"
          name="address"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.address}
        >
          <option value="" label="Select Address"></option>
          {addressFields.map((field, index) => (
            <option key={index} value={field}>
              {field}
            </option>
          ))}
        </select>
        {formik.touched.address && formik.errors.address ? (
          <div>{formik.errors.address}</div>
        ) : null}
      </div>

      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
