import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RegistrationForm = () => {
  const [addressFields, setAddressFields] = useState<any[]>([]);
  const [addressChain, setAddressChain] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
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
      addressChain[addressChain.length - 1].length === 0 &&
      addressChain.length > 2
    ) {
      const previousChain = addressChain[addressChain.length - 2];

      const guid = previousChain.find((item) => item.objectId == objectIdd!)!
        .objectGuid!;
      console.log("guid", guid); //все ок
      setGUID(guid);
    }
  }, [addressChain, objectIdd]);

  const handleAddressChange = async (objectId: string, chainIndex: number) => {
    fetchData(
      `https://food-delivery.kreosoft.ru/api/address/search?parentObjectId=${objectId}`,
      (data) => {
        setAddressChain((prevChain) => prevChain.slice(0, chainIndex + 1));
        setAddressChain((prevChain) => [...prevChain, data]);
        setObjectIdd(objectId);
      }
    );
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      gender: "Male",
      password: "",
      email: "",
      phoneNumber: "",
      dob: null,
      address: "",
      city: "",
      postalCode: "",
      building: "",
    },
    validationSchema: Yup.object({
      phoneNumber: Yup.string()
        .matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, "Invalid phone number")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const formattedData = {
          fullName: values.fullName,
          password: values.password,
          email: values.email,
          addressId: GUID,
          birthDate: selectedDate?.toISOString() || null,
          gender: values.gender,
          phoneNumber: values.phoneNumber,
        };

        console.log(formattedData);
        const response = await axios.post(
          "https://food-delivery.kreosoft.ru/api/account/register",
          formattedData
        );
        console.log("Registration successful. Token:", response.data.token);
      } catch (error) {
        console.error("Registration failed:", error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="fullName">Фио</label>
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
        <label htmlFor="gender">Пол</label>
        <select
          id="gender"
          name="gender"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.gender}
        >
          <option value="Male">Мужчина</option>
          <option value="Female">Женщина</option>
        </select>
        {formik.touched.gender && formik.errors.gender ? (
          <div>{formik.errors.gender}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="phoneNumber">Телефон</label>
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
          onChange={(e) => {
            const selectedObjectId = e.target.value;
            formik.handleChange(e);

            handleAddressChange(selectedObjectId, 0);
          }}
          onBlur={formik.handleBlur}
          value={formik.values.address || ""}
        >
          <option value="" label="Select Address"></option>
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
        <div key={chainIndex}>
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
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
      </div>

      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
