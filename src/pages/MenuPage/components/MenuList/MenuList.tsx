import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenu } from "@/modules/MenuList/Model/slice";
import { AppDispatch, RootState } from "@/store/store";
import MenuItemCard from "../MenuItemCard/MenuItemCard";
import s from "./MenuList.module.scss";

const MenuComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const menu = useSelector((state: RootState) => state.menu);

  useEffect(() => {
    dispatch(fetchMenu({ categories: "Wok", vegetarian: false, page: 1 }));
  }, [dispatch]);

  if (menu.loading === "pending") {
    return <div>Loading...</div>;
  }

  if (menu.loading === "failed") {
    return <div>Error: {menu.error}</div>;
  }

  return (
    <div className={s.MenuList}>
      {menu.dishes.map((dish) => (
        <MenuItemCard
          key={dish.id}
          id={dish.id}
          name={dish.name}
          description={dish.description}
          price={dish.price}
          image={dish.image}
          vegetarian={dish.vegetarian}
          rating={dish.rating}
          category={dish.category}
        />
      ))}
    </div>
  );
};

export default MenuComponent;
