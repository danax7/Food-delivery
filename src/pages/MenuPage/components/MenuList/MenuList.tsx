import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenu } from "@/modules/MenuList/Model/slice";
import { AppDispatch, RootState } from "@/store/store";
import MenuItemCard from "../MenuItemCard/MenuItemCard";
import s from "./MenuList.module.scss";
import { useLocation } from "react-router-dom";

const MenuList = () => {
  const dispatch: AppDispatch = useDispatch();
  const menu = useSelector((state: RootState) => state.menu);
  const location = useLocation();

  const getQueryParams = () => {
    const searchParams = new URLSearchParams(location.search);
    const categories = searchParams.getAll("categories");
    const vegetarian = searchParams.get("vegetarian");
    const sorting = searchParams.getAll("sorting");
    const page = searchParams.get("page");

    console.log("categories:", categories);
    console.log("vegetarian:", vegetarian);
    console.log("sorting:", sorting);
    console.log("page:", page);

    return { categories, vegetarian, sorting, page };
  };

  //http://localhost:5173/?categories=Drink&vegetarian=true&sorting=PriceAsc&page=1'
  useEffect(() => {
    const { categories, vegetarian, sorting, page } = getQueryParams();
    const categoriesString = Array.isArray(categories)
      ? categories.join(",")
      : categories;
    const sortingString = Array.isArray(sorting) ? sorting.join(",") : sorting;

    console.log("API Params:", {
      categories: categoriesString,
      vegetarian,
      sorting: sortingString,
      page,
    });

    dispatch(
      fetchMenu({
        categories: categoriesString,
        vegetarian,
        sorting: sortingString,
        page,
      })
    );
  }, [dispatch, location]);

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

export default MenuList;
