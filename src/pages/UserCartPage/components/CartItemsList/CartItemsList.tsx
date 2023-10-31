import { selectCartItems } from "@/modules/UserCart/Model/slice";
import { fetchCart } from "@/modules/UserCart/Model/thunk";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../CartItem/CartItem";
import s from "./CartsItemsList.module.scss";
import { Link } from "react-router-dom";

interface ICartItemList {
  withButton?: boolean;
  text?: string;
}

const CartItemList = ({ withButton, text }: ICartItemList) => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const cartItems = useSelector((state: RootState) => selectCartItems(state));

  return (
    <div className={s.CartItemList}>
      {text ? <h2>{text}</h2> : <h2>Корзина</h2>}
      <div>
        {cartItems.map((item, index) => (
          <CartItem
            key={item.id}
            item={item}
            index={index}
            withButtons={withButton ? withButton : false}
          />
        ))}
      </div>

      {withButton ? (
        <Link to="/purchase">
          <button className={s.button}>Оформить заказ</button>
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
};
export default CartItemList;
