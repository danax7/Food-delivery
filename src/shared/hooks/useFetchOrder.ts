import { useEffect, useState } from "react";
import axios from "axios";

const useFetchOrder = (orderId: string) => {
  const [order, setOrder] = useState(null);

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
        setOrder(response.data);
      } catch (error) {
        console.error("Failed to fetch order:", error);
      }
    };
    fetchOrder();
  }, [orderId]);

  return order;
};

export default useFetchOrder;
