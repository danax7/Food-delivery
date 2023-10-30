import CartItem from "@/pages/UserCartPage/components/CartItem/CartItem";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import s from "./OrderPage.module.scss";
import { useFullAddress } from "@/shared/hooks/useFullAddress";
import useConfirmDelivery from "@/shared/hooks/useConfirmDelivery";

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
  const { confirmed, confirmDelivery } = useConfirmDelivery({
    orderId: order?.id,
  });
  const fullAddress = useFullAddress(order?.address || null);
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
      {order ? (
        <div className={s.orderInfo}>
          <div className={s.sectionHeader}>
            <h2> Детали заказа </h2>
            {order.status === "Delivered" && (
              <button className={`${s.confirmButton} ${s.confirmed}`}>
                Доставка подтверждена
              </button>
            )}
            {order.status === "InProcess" && (
              <button className={s.confirmButton} onClick={confirmDelivery}>
                Подтвердить доставку
              </button>
            )}
          </div>
          <p>
            Дата заказа: {new Date(order.orderTime).toLocaleString("ru-RU")}
          </p>
          <p>
            Дата доставки:{" "}
            {new Date(order.deliveryTime).toLocaleString("ru-RU")}
          </p>

          <p>Адрес доставки: {fullAddress}</p>
          <p>
            Статус заказа:{" "}
            {order.status === "Delivered" ? "Доставлено" : "В обработке"}
          </p>
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
