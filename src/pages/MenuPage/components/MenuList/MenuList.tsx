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
    return { categories, vegetarian, sorting, page };
  };
  //http://localhost:5173/?categories=Pizza&vegetarian=false&sorting=PriceAsc&page=1
  useEffect(() => {
    const { categories, vegetarian, sorting, page } = getQueryParams();
    const defaultCategories =
      categories && categories.length > 0 ? categories : ["Wok"];
    const defaultVegetarian = vegetarian !== null ? vegetarian : false;
    const defaultSorting =
      sorting && sorting.length > 0 ? sorting : ["NameAsc"];
    const defaultPage = page !== null ? page : 1;

    const categoriesString = defaultCategories.join(",");
    const sortingString = defaultSorting.join(",");

    dispatch(
      fetchMenu({
        categories: categoriesString,
        vegetarian: defaultVegetarian,
        sorting: sortingString,
        page: defaultPage,
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
