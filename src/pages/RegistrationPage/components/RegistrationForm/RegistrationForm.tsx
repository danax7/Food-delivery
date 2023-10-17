import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RegistrationForm = () => {
  const [addressFields, setAddressFields] = useState<any[]>([]);
  const [subAddressFields, setSubAddressFields] = useState<any[]>([]);
  const [streetFields, setStreetFields] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [selectedSubAddress, setSelectedSubAddress] = useState<string | null>(
    null
  );
  const [selectedStreet, setSelectedStreet] = useState<string | null>(null);
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  const [buildingFields, setBuildingFields] = useState<any[]>([]);
  const [subAddressType, setSubAddressType] = useState<string>(
    "Следующий элемент адреса"
  );
  const [streetType, setStreetType] = useState<string>(
    "Следующий элемент адреса"
  );

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

  const handleAddressChange = async (objectId: string) => {
    fetchData(
      `https://food-delivery.kreosoft.ru/api/address/search?parentObjectId=${objectId}`,
      (data) => {
        setSubAddressFields(data);
        setSubAddressType(
          data.length > 0 ? data[0].objectLevelText : "Следующий элемент адреса"
        );
      }
    );
  };

  useEffect(() => {
    if (selectedSubAddress) {
      fetchData(
        `https://food-delivery.kreosoft.ru/api/address/search?parentObjectId=${selectedSubAddress}`,
        (data) => {
          setStreetFields(data);
          setStreetType(
            data.length > 0
              ? data[0].objectLevelText
              : "Следующий элемент адреса"
          );
        }
      );
    }
  }, [selectedSubAddress]);

  useEffect(() => {
    if (selectedStreet) {
      fetchData(
        `https://food-delivery.kreosoft.ru/api/address/search?parentObjectId=${selectedStreet}`,
        setBuildingFields
      );
    }
  }, [selectedStreet]);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      gender: "Male",
      password: "",
      email: "",
      phoneNumber: "",
      address: "",
      subAddress: "",
      street: "",
      building: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Required"),
      gender: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().required("Required"),

      phoneNumber: Yup.string()
        .matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, "Invalid phone number")
        .required("Required"),
      address: Yup.string().required("Required"),
      subAddress: Yup.string().required("Required"),
      street: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const formattedData = {
          fullName: values.fullName,
          password: values.password,
          email: values.email,
          addressId: values.building,
          birthDate: selectedDate?.toISOString() || null,
          gender: values.gender,
          phoneNumber: values.phoneNumber,
        };
        console.log(formattedData);
        const response = await axios.post(
          "/api/account/register",
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
          onChange={(e) => {
            const selectedObjectId = e.target.value;
            setSelectedAddress(selectedObjectId);
            formik.handleChange(e);
            handleAddressChange(selectedObjectId);
          }}
          onBlur={formik.handleBlur}
          value={selectedAddress || ""}
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
      {selectedAddress && (
        <div>
          <label htmlFor="subAddress">{subAddressType}</label>
          <select
            id="subAddress"
            name="subAddress"
            onChange={(e) => {
              setSelectedSubAddress(e.target.value);
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            value={selectedSubAddress || ""}
          >
            <option value="" label="выбрать"></option>
            {subAddressFields.map((field, index) => (
              <option key={index} value={field.objectId}>
                {field.text}
              </option>
            ))}
          </select>
          {formik.touched.subAddress && formik.errors.subAddress ? (
            <div>{formik.errors.subAddress}</div>
          ) : null}
        </div>
      )}
      {selectedSubAddress && (
        <div>
          <label htmlFor="street">{streetType}</label>
          <select
            id="street"
            name="street"
            onChange={(e) => {
              setSelectedStreet(e.target.value);
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            value={selectedStreet || ""}
          >
            <option value="" label="выбрать"></option>
            {streetFields.map((field, index) => (
              <option key={index} value={field.objectId}>
                {field.text}
              </option>
            ))}
          </select>
          {formik.touched.street && formik.errors.street ? (
            <div>{formik.errors.street}</div>
          ) : null}
        </div>
      )}
      {selectedSubAddress && (
        <div>
          <label htmlFor="building">Дом:</label>
          <select
            id="building"
            name="building"
            onChange={(e) => {
              setSelectedBuilding(e.target.value);
              console.log(e.target.value);
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.building}
          >
            <option value="" label="выбрать"></option>
            {buildingFields.map((field, index) => (
              <option key={index} value={field.objectGuid}>
                {field.text}
              </option>
            ))}
          </select>
          {formik.touched.building && formik.errors.building ? (
            <div>{formik.errors.building}</div>
          ) : null}
        </div>
      )}
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
