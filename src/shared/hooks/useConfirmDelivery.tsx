import { useState } from "react";
import axios from "axios";

interface ConfirmDeliveryButtonProps {
  orderId: string;
}

const useConfirmDelivery = ({ orderId }: ConfirmDeliveryButtonProps) => {
  const [confirmed, setConfirmed] = useState<boolean>(false);

  const confirmDelivery = async () => {
    try {
      await axios.post(
        `https://food-delivery.kreosoft.ru/api/order/${orderId}/status`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setConfirmed(true);
      console.log(`Order ${orderId} delivery confirmed successfully.`);
    } catch (error) {
      console.error("Failed to confirm order delivery:", error);
    }
  };

  return {
    confirmed,
    confirmDelivery,
  };
};

export default useConfirmDelivery;
