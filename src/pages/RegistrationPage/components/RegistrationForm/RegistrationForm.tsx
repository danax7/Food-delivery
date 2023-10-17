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
  const [buildingFields, setBuildingFields] = useState<any[]>([]);
  const [subAddressType, setSubAddressType] = useState<string>(
    "Следующий элемент адреса"
  );
  const [streetType, setStreetType] = useState<string>(
    "Следующий элемент адреса"
  );
  const formik = useFormik({
    initialValues: {
      fullName: "",
      gender: "Male",
      phoneNumber: "",
      address: "",
      subAddress: "",
      street: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Required"),
      gender: Yup.string().required("Required"),
      phoneNumber: Yup.string()
        .matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, "Invalid phone number")
        .required("Required"),
      address: Yup.string().required("Required"),
      subAddress: Yup.string().required("Required"),
      street: Yup.string().required("Required"),
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
        setAddressFields(response.data);
      } catch (error) {
        console.error("Failed to fetch address fields:", error);
      }
    };

    fetchAddressFields();
  }, []);

  const handleAddressChange = async (objectId: string) => {
    try {
      const response = await axios.get(
        `https://food-delivery.kreosoft.ru/api/address/search?parentObjectId=${objectId}`
      );
      setSubAddressFields(response.data);

      if (response.data.length > 0) {
        setSubAddressType(response.data[0].objectLevelText);
      } else {
        setSubAddressType("Следующий элемент адреса");
      }
    } catch (error) {
      console.error("Failed to fetch sub-address fields:", error);
    }
  };
  useEffect(() => {
    if (selectedSubAddress) {
      const fetchStreetFields = async () => {
        try {
          const response = await axios.get(
            `https://food-delivery.kreosoft.ru/api/address/search?parentObjectId=${selectedSubAddress}`
          );
          setStreetFields(response.data);
          console.log(selectedSubAddress);
          console.log(response.data);
          if (response.data.length > 0) {
            setStreetType(response.data[0].objectLevelText);
          } else {
            setStreetType("Следующий элемент адреса");
          }
        } catch (error) {
          console.error("Failed to fetch street fields:", error);
        }
      };

      fetchStreetFields();
    }
  }, [selectedSubAddress]);

  useEffect(() => {
    if (selectedStreet) {
      const fetchBuildingFields = async () => {
        try {
          const response = await axios.get(
            `https://food-delivery.kreosoft.ru/api/address/search?parentObjectId=${selectedStreet}`
          );
          setBuildingFields(response.data);
        } catch (error) {
          console.error("Failed to fetch building fields:", error);
        }
      };

      fetchBuildingFields();
    }
  }, [selectedStreet]);
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
      {selectedStreet && (
        <div>
          <label htmlFor="building">Дом:</label>
          <select
            id="building"
            name="building"
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.building}
          >
            <option value="" label="выбрать"></option>
            {buildingFields.map((field, index) => (
              <option key={index} value={field.objectId}>
                {field.text}
              </option>
            ))}
          </select>
          {formik.touched.building && formik.errors.building ? (
            <div>{formik.errors.building}</div>
          ) : null}
        </div>
      )}

      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
