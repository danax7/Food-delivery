import { Link } from "react-router-dom";
import s from "../ui/Header.module.scss";
export const LinksList = () => {
  return (
    <div className={s.LinksList}>
      <Link to={"/"} className={s.item}>
        Меню
      </Link>
      <Link to="" className={s.item}>
        Заказы
      </Link>
      <Link to="" className={s.item}>
        Корзина
      </Link>
    </div>
  );
};
