import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import s from "./MenuItemCard.module.scss";
import vegetarianIcon from "@/assets/img/Leaf_icon.svg";
import { selectCartItems } from "@/modules/UserCart/Model/slice";
import {
  addToCart,
  fetchCart,
  removeFromCart,
} from "@/modules/UserCart/Model/thunk";
import { AppDispatch, RootState } from "@/store/store";

interface IMenuItemCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  vegetarian: boolean;
  rating: number;
  category: string;
}

const MenuItemCard = ({
  id,
  name,
  description,
  price,
  image,
  vegetarian,
  rating,
  category,
}: IMenuItemCardProps) => {
  const dispatch: AppDispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => selectCartItems(state));
  const cartItem = cartItems.find((item) => item.id === id);
  const quantityInCart = cartItem ? cartItem.amount : 0;
  console.log("quantityInCart", quantityInCart);
  const handleAddToCart = () => {
    dispatch(addToCart(id));
    dispatch(fetchCart());
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart({ dishId: id, increase: true }));
    dispatch(fetchCart());
  };

  return (
    <div className={s.MenuItemCard}>
      <Link to={`/item/${id}`} className={s.btn}>
        <div className={s.ImageBlock}>
          <img src={image} alt={name} className={s.DishImage} />
          {vegetarian ? (
            <img src={vegetarianIcon} className={s.vegetarianIcon}></img>
          ) : (
            ""
          )}
        </div>
      </Link>
      <div className={s.info}>
        <div className={s.description}>
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
        <div className={s.priceBlock}>
          <p> {price}₽</p>
          {quantityInCart > 0 ? (
            <>
              <p>Quantity in Cart: {quantityInCart}</p>
              <button onClick={handleAddToCart}>+</button>
              <button onClick={handleRemoveFromCart}>-</button>
            </>
          ) : (
            <button className={s.addToCart} onClick={handleAddToCart}>
              В корзину
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
