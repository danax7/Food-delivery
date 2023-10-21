import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDish,
  selectDish,
  selectDishLoading,
  selectDishError,
} from "@/modules/DishInfo/Model/slice";
import { useParams } from "react-router-dom";
import { AppDispatch } from "@/store/store";

import { IDish } from "@/modules/DishInfo/Model/types";
import DishInfo from "../components/DishInfo/DishInfo";

const DishPage: React.FC = () => {
  const { dishId } = useParams<{ dishId: string }>();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDish({ dishId }));
  }, [dispatch, dishId]);

  const dish: IDish | null = useSelector(selectDish);
  const isLoading: boolean = useSelector(selectDishLoading);
  const error: string | null = useSelector(selectDishError);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!dish) {
    return <div>Dish not found</div>;
  }

  return (
    <>
      <DishInfo dish={dish} />
    </>
  );
};

export default DishPage;
