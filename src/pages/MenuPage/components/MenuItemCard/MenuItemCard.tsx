import { Link } from "react-router-dom";
import s from "./MenuItemCard.module.scss";
import vegetarianIcon from "@/assets/img/Leaf_icon.svg";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "@/modules/UserCart/Model/slice";
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
  //   console.log(id);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(id));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(id));
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
          <button className={s.addToCart}>В корзину</button>
        </div>
        <button onClick={handleAddToCart}>Add to Cart</button>
        <button onClick={handleRemoveFromCart}>Remove from Cart</button>
      </div>
    </div>
  );
};

export default MenuItemCard;
