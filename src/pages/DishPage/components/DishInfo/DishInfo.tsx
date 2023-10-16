import { IDish } from "@/modules/DishInfo/Model/types";
import s from "./DishInfo.module.scss";
interface DishInfoProps {
  dish: IDish;
}

const DishInfo = ({ dish }: DishInfoProps) => {
  return (
    <div className={s.DishInfoWrapper}>
      <div className={s.DishInfo}>
        <h2>{dish.name}</h2>
        <img src={dish.image} alt={dish.name} className={s.DishImage} />
        <p>Категория блюда - {dish.category}</p>
        <p>{dish.vegetarian ? "Вегетерианское" : "Не вегетерианское"}</p>
        <p>{dish.description}</p>
        <p>Рейтинг {dish.rating}</p>
        <p>Цена: {dish.price}./шт</p>
      </div>
    </div>
  );
};

export default DishInfo;
