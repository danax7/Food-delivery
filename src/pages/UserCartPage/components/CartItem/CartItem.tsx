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
import trashIcon from "@/assets/img/trash_icon.svg";

interface CartItemProps {
  item: CartItemType;
  index: number;
}

const CartItem = ({ item, index }: CartItemProps) => {
  const dispatch: AppDispatch = useDispatch();

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
      <div className={s.InfoBlock}>
        <div>
          <div>{index + 1}.</div>
          <img src={item.image} alt={item.name} className={s.CartItemImage} />
        </div>

        <div className={s.Info}>
          <h3>{item.name}</h3>
          <p>Цена/шт: {item.price}₽</p>
        </div>
      </div>

      <div className={s.CartItemDetails}>
        <div className={s.ButtonsBlock}>
          <span onClick={handleRemoveFromCart}>-</span>
          <p> {item.amount}</p>
          <span onClick={handleAddToCart}>+</span>
        </div>
        <p>{item.totalPrice}₽</p>
        <img
          src={trashIcon}
          alt="logo"
          onClick={handleRemoveFromCartCompletely}
          className={s.removeAll}
        />
      </div>
    </div>
  );
};

export default CartItem;
