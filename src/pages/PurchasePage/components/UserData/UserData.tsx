import { useEffect, useState } from "react";
import s from "../PurchaseForm/PurchaseForm.module.scss";
import axios from "axios";
interface UserData {
  fullName: string;
  birthDate: string;
  gender: string;
  address: string;
  email: string;
  phoneNumber: string;
  id: string;
}

const UserData = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  useEffect(() => {
    const fetchData = async () => {
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
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={s.formWrapper}>
      <div className={s.UserData}>
        <h2>Данные покупателя</h2>
        <div className={s.formItem}>
          <label>Номер телефона</label>
          <input value={userData?.phoneNumber} disabled />
        </div>
        <div className={s.formItem}>
          <label>Email</label>
          <input value={userData?.email} disabled />
        </div>
      </div>
    </div>
  );
};
export default UserData;
