import CartItem from "@/pages/UserCartPage/components/CartItem/CartItem";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import s from "./OrderPage.module.scss";

interface Dish {
  id: string;
  name: string;
  price: number;
  totalPrice: number;
  amount: number;
  image: string;
}

interface Order {
  id: string;
  deliveryTime: string;
  orderTime: string;
  status: string;
  price: number;
  dishes: Dish[];
  address: string;
}

const OrderPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get<Order>(
          `https://food-delivery.kreosoft.ru/api/order/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setOrder(response.data);
      } catch (error) {
        console.error("Failed to fetch order:", error);
      }
    };
    fetchOrder();
  }, [orderId]);

  return (
    <div className={s.orderDetails}>
      <h2> Детали заказа</h2>
      {order ? (
        <div>
          <p>Дата заказа: {new Date(order.orderTime).toLocaleString()}</p>
          <p>Дата доставки: {new Date(order.deliveryTime).toLocaleString()}</p>

          <p>Адрес доставки: {order.address}</p>
          <p>Статус заказа: {order.status}</p>
          <h3>Список блюд:</h3>
          {order.dishes.map((dish: Dish, index) => (
            <CartItem
              key={dish.id}
              item={dish}
              index={index}
              withButtons={false}
            />
          ))}
          <p>
            <strong>Стоимость заказа: </strong>
            {order.price} руб.
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default OrderPage;
