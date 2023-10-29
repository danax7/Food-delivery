import { Order } from "../../types";

interface OrderItemProps {
  order: Order;
}

const OrderItem = ({ order }: OrderItemProps) => {
  return (
    <div>
      {/* <h3>Order ID: {order.id}</h3> */}
      <p>Время доставки {order.deliveryTime}</p>
      <p>Заказ от {order.orderTime}</p>
      <p>Статус заказа {order.status}</p>
      <p>
        <strong>Стоимость заказа</strong>
        {order.price} руб.
      </p>
      <hr />
    </div>
  );
};

export default OrderItem;
