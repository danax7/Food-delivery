import { Link } from "react-router-dom";
import s from "./MenuItemCard.module.scss";
import vegetarianIcon from "@/assets/img/Leaf_icon.svg";
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
      </div>
    </div>
  );
};

export default MenuItemCard;
