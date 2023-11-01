import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import { IDish } from "@/modules/DishInfo/Model/types";
import s from "./DishInfo.module.scss";

interface DishInfoProps {
  dish: IDish;
}

const DishInfo = ({ dish }: DishInfoProps) => {
  const [canRate, setCanRate] = useState(false);
  const [userRating, setUserRating] = useState(null);
  const [isRequestComplete, setIsRequestComplete] = useState(false);

  useEffect(() => {
    checkRatingPermission();
  }, []);

  const checkRatingPermission = async () => {
    try {
      const response = await axios.get(
        `https://food-delivery.kreosoft.ru/api/dish/${dish.id}/rating/check`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data == true) {
        setCanRate(true);
      } else {
        setCanRate(false);
      }
    } catch (error) {
      console.error("Failed to check rating permission:", error);
    } finally {
      setIsRequestComplete(true); // Пометить запрос как завершенный
    }
  };

  const handleRatingChange = async (newRating) => {
    if (canRate) {
      try {
        await axios.post(
          `https://food-delivery.kreosoft.ru/api/dish/${dish.id}/rating?ratingScore=${newRating}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUserRating(newRating);
      } catch (error) {
        console.error("Failed to submit rating:", error);
      }
    } else {
      console.log("User is not allowed to rate this dish.");
    }
  };
  if (!isRequestComplete) {
    return <div>Loading...</div>;
  }

  return (
    <div className={s.DishInfoWrapper}>
      <div className={s.DishInfo}>
        <h2>{dish.name}</h2>
        <img src={dish.image} alt={dish.name} className={s.DishImage} />
        <p>Категория блюда - {dish.category}</p>
        <p>{dish.vegetarian ? "Вегетерианское" : "Не вегетерианское"}</p>
        <p>{dish.description}</p>
        <div className={s.RatingWrapper}>
          <ReactStars
            count={10}
            value={userRating === null ? dish.rating : userRating}
            size={28}
            edit={canRate}
            activeColor="#ffd700"
            onChange={handleRatingChange}
          />
        </div>
        <p>Цена: {dish.price} руб./шт</p>
      </div>
    </div>
  );
};

export default DishInfo;
