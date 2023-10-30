import React from "react";
import { Link } from "react-router-dom";
import s from "./OrderItem.module.scss";

import { Order } from "../../types";
import useConfirmDelivery from "@/shared/hooks/useConfirmDelivery";

interface OrderItemProps {
  order: Order;
}

const OrderItem = ({ order }: OrderItemProps) => {
  const { confirmed, confirmDelivery } = useConfirmDelivery({
    orderId: order.id,
  });

  const orderTime = new Date(order.orderTime).toLocaleString("ru-RU");
  const deliveryTime = new Date(order.deliveryTime).toLocaleString("ru-RU");

  return (
    <div className={s.orderItem}>
      <div className={s.OrderInfo}>
        <Link to={`/order/${order.id}`}>
          <p className={s.orderTime}>Заказ от {orderTime}</p>
        </Link>
        <p>
          Статус заказа -
          {order.status === "InProcess" ? " В обработке" : " Доставлено"}
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
