import { IDish } from "@/modules/DishInfo/Model/types";
import s from "./DishInfo.module.scss";
import ReactStars from "react-rating-stars-component";

interface DishInfoProps {
  dish: IDish;
}

const DishInfo = ({ dish }: DishInfoProps) => {
  console.log(dish.rating);
  return (
    <div className={s.DishInfoWrapper}>
      <div className={s.DishInfo}>
        <h2>{dish.name}</h2>
        <img src={dish.image} alt={dish.name} className={s.DishImage} />
        <p>Категория блюда - {dish.category}</p>
        <p>{dish.vegetarian ? "Вегетерианское" : "Не вегетерианское"}</p>
        <p>{dish.description}</p>
        <div className={s.RatingWrapper}>
          <ReactStars
            count={10}
            value={dish.rating}
            size={28}
            edit={false}
            activeColor="#ffd700"
          />
        </div>
        <p>Цена: {dish.price} руб./шт</p>
      </div>
    </div>
  );
};

export default DishInfo;
