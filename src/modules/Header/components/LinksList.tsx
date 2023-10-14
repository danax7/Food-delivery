import { Link } from "react-router-dom";
import s from "../ui/Header.module.scss";
export const LinksList = () => {
  return (
    <div className={s.LinksList}>
      <Link to="/films">Меню</Link>
      <Link to="/auth">Заказы</Link>
      <Link to="/profile">Корзина</Link>
    </div>
  );
};
