import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
interface IDish {
  name: string;
  description: string;
  price: number;
  image: string;
  vegetarian: boolean;
  rating: number;
  category: string;
  id: string;
}
const DishPage = () => {
  const { dishId } = useParams<{ dishId: string }>();
  const [dish, setDish] = useState<IDish>();

  useEffect(() => {
    const getDish = async () => {
      try {
        const response = await axios.get(
          "https://food-delivery.kreosoft.ru/api/dish/" + `${dishId}`
        );
        setDish(response.data);
      } catch (error) {
        console.error("Ошибка при получении информации о блюде:", error);
      }
    };

    getDish();
  }, [dishId]);

  if (!dish) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{dish.name}</h2>
      <p>{dish.description}</p>
      <p>Price: {dish.price}</p>
      <img src={dish.image} alt={dish.name} />
      <p>Category: {dish.category}</p>
      <p>Vegetarian: {dish.vegetarian ? "Yes" : "No"}</p>
    </div>
  );
};

export default DishPage;
