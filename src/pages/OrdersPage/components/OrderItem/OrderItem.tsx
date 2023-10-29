import axios from "axios";
import { Order } from "../../types";
import s from "./OrderItem.module.scss";
import { useState } from "react";
interface OrderItemProps {
  order: Order;
}

const OrderItem = ({ order }: OrderItemProps) => {
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const orderTime = new Date(order.orderTime).toLocaleString("ru-RU");
  const deliveryTime = new Date(order.deliveryTime).toLocaleString("ru-RU");
  console.log(order.id);
  const confirmDelivery = async () => {
    try {
      await axios.post(
        `https://food-delivery.kreosoft.ru/api/order/${order.id}/status`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setConfirmed(true);
      console.log(`Order ${order.id} delivery confirmed successfully.`);
    } catch (error) {
      console.error("Failed to confirm order delivery:", error);
    }
  };

  return (
    <div className={s.orderItem}>
      <div className={s.OrderInfo}>
        <p className={s.orderTime}>Заказ от {orderTime}</p>
        <p>
          Статус заказа -{" "}
          {order.status === "InProcess" ? "В обработке" : "Доставлено"}
        </p>
        <p>Доставлен: {deliveryTime}</p>
      </div>
      <div className={s.confirmBlock}>
        <p>
          <strong>Стоимость заказа </strong>
          {order.price} руб.
        </p>
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
    </div>
  );
};

export default OrderItem;
