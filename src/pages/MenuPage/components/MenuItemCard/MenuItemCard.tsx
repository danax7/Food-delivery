import { Link } from "react-router-dom";
import s from "./MenuItemCard.module.scss";
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
  return (
    <div className={s.MenuItemCard}>
      <img src={image} alt={name} />
      <div className={s.info}>
        <div className={s.description}>
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
        <div className={s.priceBlock}>
          <p> {price}₽</p>
          <button className={s.addToCart}>В корзину</button>
        </div>
      </div>

      {/* <p>{vegetarian}</p>
      <p>{rating}</p>
      <p>{category}</p> */}
    </div>
  );
};

export default MenuItemCard;
