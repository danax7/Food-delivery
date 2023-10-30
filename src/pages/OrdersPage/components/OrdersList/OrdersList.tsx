import React, { useEffect, useState } from "react";
import axios from "axios";
import { Order } from "../../types";
import OrderItem from "../OrderItem/OrderItem";
import s from "../../ui/OrdersPage.module.scss";
const OrdersList = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get<Order[]>(
          "https://food-delivery.kreosoft.ru/api/order",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className={s.ordersList}>
      <h2>Последние заказы</h2>
      {orders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </div>
  );
};

export default OrdersList;
