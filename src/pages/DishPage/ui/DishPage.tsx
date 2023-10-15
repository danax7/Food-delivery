import { Header } from "@/modules/Header/ui/Header";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDish,
  selectDish,
  selectDishLoading,
  selectDishError,
} from "@/modules/DishInfo/Model/slice";
import { useParams } from "react-router-dom";

const DishPage = () => {
  const { dishId } = useParams<{ dishId: string }>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDish({ dishId }));
  }, [dispatch, dishId]);

  const dish = useSelector(selectDish);
  const isLoading = useSelector(selectDishLoading);
  const error = useSelector(selectDishError);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!dish) {
    return <div>Dish not found</div>;
  }

  return (
    <>
      <Header />
      <h2>{dish.name}</h2>
      <img src={dish.image} alt={dish.name} />
      <p>Категория блюда: {dish.category}</p>
      <p>{dish.description}</p>
      <p>Price: {dish.price}</p>
      <p> {dish.rating}</p>
      <p>
        Vegetarian: {dish.vegetarian ? "Вегетерианское" : "Не вегетерианское"}
      </p>
    </>
  );
};

export default DishPage;
