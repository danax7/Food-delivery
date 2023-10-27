import React from "react";
import { useDispatch } from "react-redux";
import {
  addToCart,
  fetchCart,
  removeFromCart,
} from "@/modules/UserCart/Model/thunk";
import { CartItem as CartItemType } from "@/modules/UserCart/Model/types";
import s from "./CartItem.module.scss";
import { AppDispatch } from "@/store/store";

interface CartItemProps {
  item: CartItemType;
  index: number;
}

const CartItem = ({ item, index }: CartItemProps) => {
  const dispatch: AppDispatch = useDispatch();

  //   const handleRemoveFromCart = () => {
  //     dispatch(removeFromCart({ dishId: item.id, increase: true }));
  //   };
  const handleAddToCart = async () => {
    await dispatch(addToCart(item.id));
    await dispatch(fetchCart());
  };

  const handleRemoveFromCart = async () => {
    await dispatch(removeFromCart({ dishId: item.id, increase: true }));
    await dispatch(fetchCart());
  };

  const handleRemoveFromCartCompletely = async () => {
    await dispatch(removeFromCart({ dishId: item.id, increase: false }));
    await dispatch(fetchCart());
  };
  return (
    <div className={s.CartItem}>
      <div>{index + 1}.</div>
      <img src={item.image} alt={item.name} className={s.CartItemImage} />
      <div className={s.CartItemDetails}>
        <div className={s.InfoBlock}>
          <h3>{item.name}</h3>
          <p>Цена/шт {item.price}₽</p>
        </div>

        <div className={s.ButtonsBlock}>
          <button onClick={handleRemoveFromCart}>-</button>
          <p> {item.amount}</p>
          <button onClick={handleAddToCart}>+</button>
        </div>
        <button onClick={handleRemoveFromCartCompletely}>Удалить</button>
      </div>
    </div>
  );
};

export default CartItem;
