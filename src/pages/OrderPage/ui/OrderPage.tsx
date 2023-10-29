import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const OrderPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `https://food-delivery.kreosoft.ru/api/order/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch order:", error);
      }
    };
    fetchOrder();
  });

  return (
    <div>
      <h1>OrderPage</h1>
    </div>
  );
};

export default OrderPage;
