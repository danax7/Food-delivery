import { selectCartItems } from "@/modules/UserCart/Model/slice";
import { fetchCart } from "@/modules/UserCart/Model/thunk";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../CartItem/CartItem";
import s from "./CartsItemsList.module.scss";

const CartItemList = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const cartItems = useSelector((state: RootState) => selectCartItems(state));
  console.log(cartItems);

  return (
    <>
      <h2>Корзина</h2>
      <div className={s.CartItemList}>
        {cartItems.map((item, index) => (
          <CartItem key={item.id} item={item} index={index} />
        ))}
      </div>
    </>
  );
};
export default CartItemList;
