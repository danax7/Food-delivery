import React, { useEffect } from "react";
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
import ReactStars from "react-rating-stars-component";
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
  const handleAddToCart = async () => {
    await dispatch(addToCart(id));
    await dispatch(fetchCart());
  };

  const handleRemoveFromCart = async () => {
    await dispatch(removeFromCart({ dishId: id, increase: true }));
    await dispatch(fetchCart());
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
          <ReactStars
            count={10}
            value={rating + 2}
            size={24}
            edit={false}
            isHalf={true}
            activeColor="#ffd700"
          />
          <p>{description}</p>
        </div>
        <div className={s.priceBlock}>
          <p> {price}₽</p>
          <div className={s.cartActions}>
            {quantityInCart > 0 ? (
              <>
                <button onClick={handleAddToCart}>+</button>
                <p> {quantityInCart}</p>
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
    </div>
  );
};

export default MenuItemCard;
