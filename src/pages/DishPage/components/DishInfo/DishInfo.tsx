import { IDish } from "@/modules/DishInfo/Model/types";

interface DishInfoProps {
  dish: IDish;
}

const DishInfo = ({ dish }: DishInfoProps) => {
  return (
    <div>
      <h2>{dish.name}</h2>
      <img src={dish.image} alt={dish.name} />
      <p>Категория блюда: {dish.category}</p>
      <p>{dish.description}</p>
      <p>Price: {dish.price}</p>
      <p>Rating: {dish.rating}</p>
      <p>
        Vegetarian: {dish.vegetarian ? "Вегетерианское" : "Не вегетерианское"}
      </p>
    </div>
  );
};

export default DishInfo;
