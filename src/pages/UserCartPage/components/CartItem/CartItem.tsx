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
}

const CartItem = ({ item }: CartItemProps) => {
  const dispatch: AppDispatch = useDispatch();

  //   const handleRemoveFromCart = () => {
  //     dispatch(removeFromCart({ dishId: item.id, increase: true }));
  //   };
  const handleAddToCart = async () => {
    await dispatch(addToCart(id));
    await dispatch(fetchCart());
  };

  const handleRemoveFromCart = async () => {
    await dispatch(removeFromCart({ dishId: id, increase: true }));
    await dispatch(fetchCart());
  };
  return (
    <div className={s.CartItem}>
      <img src={item.image} alt={item.name} className={s.CartItemImage} />
      <div className={s.CartItemDetails}>
        <h3>{item.name}</h3>
        <p>Цена: {item.price}₽</p>
        <p>Количество: {item.amount}</p>
        <button onClick={handleRemoveFromCart}>Удалить из корзины</button>
      </div>
    </div>
  );
};

export default CartItem;
