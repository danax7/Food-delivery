import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import s from "./ProfileForm.module.scss";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { clearToken } from "@/modules/Auth/Model/slice";

interface UserData {
  fullName: string;
  birthDate: string;
  gender: string;
  address: string;
  email: string;
  phoneNumber: string;
  id: string;
}
const RegistrationForm = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [addressFields, setAddressFields] = useState<any[]>([]);
  const [addressChain, setAddressChain] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [GUID, setGUID] = useState<string>("");
  const [profileAdressGUID, setprofileAdressGUID] = useState<string>("");
  const [objectIdd, setObjectIdd] = useState<string>("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const fetchData = async (url, callback) => {
    try {
      const response = await axios.get(url);
      callback(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      fullName: `${userData?.fullName}`,
      gender: "Male",
      password: "",
      email: "",
      phoneNumber: `${userData?.phoneNumber}`,
      dob: userData?.birthDate ? userData?.birthDate.split("T")[0] : null,

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
        const updatedData = {
          fullName: values.fullName,
          birthDate: new Date(selectedDate!).toISOString(),
          gender: values.gender,
          addressId: GUID,
          phoneNumber: values.phoneNumber,
        };

        console.log("Updated Data:", updatedData);
        await updateProfile(updatedData);
      } catch (error) {
        console.error("Failed to update profile:", error);
      }
    },
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "https://food-delivery.kreosoft.ru/api/account/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUserData(response.data);
        const formattedDate = response.data.birthDate.split("T")[0];

        console.log(userData);
        formik.setValues({
          fullName: response.data.fullName,
          gender: response.data.gender,
          phoneNumber: response.data.phoneNumber,
          dob: formattedDate,
          email: response.data.email,
          address: response.data.address,
          password: "",
          city: "",
          postalCode: "",
          building: "",
        });
        setprofileAdressGUID(response.data.address);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          dispatch(clearToken());
          navigate("/login");
        }
      }
    };

    fetchUserProfile();
  }, []);

  const updateProfile = async (updatedData) => {
    try {
      const response = await axios.put(
        "https://food-delivery.kreosoft.ru/api/account/profile",
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Profile updated successfully:", response.data);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };
  useEffect(() => {
    const fetchAddressChain = async () => {
      try {
        const response = await axios.get(
          `https://food-delivery.kreosoft.ru/api/address/getaddresschain?objectGuid=${profileAdressGUID}`
        );
        console.log(profileAdressGUID);
        if (response.data) {
          setAddressChain(response.data);
          console.log("цепочка", response.data);
        }
      } catch (error) {
        console.error("Failed to fetch address chain:", error);
      }
    };

    if (profileAdressGUID) {
      fetchAddressChain();
    }
  }, [profileAdressGUID]);

  const getFullAddress = (): string => {
    const fullAddress = addressChain
      .map((addressObj) => addressObj.text)
      .join(", ");
    console.log(fullAddress);
    return fullAddress;
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
      console.log("guid", guid);
      setGUID(guid);
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
    <form onSubmit={formik.handleSubmit} className={s.form}>
      <h2>Профиль</h2>
      <div className={s.formWrapper}>
        <div className={s.formItem}>
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

        <div className={s.formItem}>
          <label htmlFor="email">Email:</label>
          <p>{userData?.email}</p>
        </div>
        <div className={s.formItem}>
          <label htmlFor="dob">Дата рождения:</label>
          <input
            id="dob"
            name="dob"
            type="date"
            value={formik.values.dob}
            onChange={(event) => {
              const selectedDate = event.target.value;
              console.log(selectedDate);
              setSelectedDate(selectedDate);

              formik.setFieldValue("dob", selectedDate);
            }}
          />
        </div>

        <div className={s.formItem}>
          <label htmlFor="gender">Пол</label>
          <p>{userData?.gender === "Male" ? "Мужской" : "Женский"}</p>
        </div>
        <div className={s.formItem}>
          <label htmlFor="phoneNumber">Телефон</label>
          <InputMask
            mask="+7 (999) 999-99-99"
            maskChar=" "
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            placeholder="+7 (___) ___-__-__"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phoneNumber}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <div>{formik.errors.phoneNumber}</div>
          ) : null}
        </div>
        {!formik.touched.address && (
          <div className={s.formItem}>
            <label htmlFor="addressUserProfile">Адрес:</label>
            <div>{getFullAddress()}</div>
          </div>
        )}

        <div className={s.addressChain}>
          <h3>Изменить адрес</h3>

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

        <button type="submit">Обновить</button>
      </div>
    </form>
  );
};

export default RegistrationForm;
function dispatch(arg0: { payload: undefined; type: "auth/clearToken" }) {
  throw new Error("Function not implemented.");
}
