import s from "../PurchaseForm/PurchaseForm.module.scss";
const UserData = () => {
  return (
    <div className={s.formWrapper}>
      <h2>Данные покупателя</h2>
      <div className={s.formItem}>
        <label>Телефон</label>
        <input value={"121212"} disabled />
      </div>
      <div className={s.formItem}>
        <label>Email</label>
        <input value={"121@gmail.com"} disabled />
      </div>
    </div>
  );
};
export default UserData;
