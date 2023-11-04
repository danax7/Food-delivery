import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems } from "@/modules/UserCart/Model/slice";
import s from "../ui/Header.module.scss";
import { selectIsAuthenticated } from "@/modules/Auth/Model/slice";

export const LinksList = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const cartItems = useSelector(selectCartItems);
  const totalCartItems = cartItems.reduce(
    (total, item) => total + item.amount,
    0
  );

  return (
    <div className={s.LinksList}>
      <Link to={"/"} className={s.item}>
        Меню
      </Link>
      <Link to="/orders/" className={s.item}>
        Заказы
      </Link>
      <Link to={"/cart/"} className={`${s.item} ${s.cart}`}>
        Корзина
        {totalCartItems > 0 && isAuthenticated && (
          <span className={s.cartCount}>{totalCartItems}</span>
        )}
      </Link>
    </div>
  );
};
