import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenu } from "@/modules/MenuList/Model/slice";
import { AppDispatch, RootState } from "@/store/store";
import MenuItemCard from "../MenuItemCard/MenuItemCard";
import s from "./MenuList.module.scss";
import { useLocation, useSearchParams } from "react-router-dom";

const MenuList = () => {
  const dispatch: AppDispatch = useDispatch();
  const menu = useSelector((state: RootState) => state.menu);
  const location = useLocation();
  const [categories, setCategories] = useState<string[]>([]);
  const [vegetarian, setVegetarian] = useState<boolean | null>(null);
  const [sorting, setSorting] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  const [params, setParams] = useSearchParams();

  const getQueryParams = () => {
    const searchParams = new URLSearchParams(location.search);
    const categories = searchParams.getAll("categories");
    const vegetarian = searchParams.get("vegetarian");
    const sorting = searchParams.get("sorting");
    const page = searchParams.get("page");
    return { categories, vegetarian, sorting, page };
  };

  useEffect(() => {
    const { categories, vegetarian, sorting, page } = getQueryParams();
    setCategories(categories !== null ? categories : []);
    setVegetarian(vegetarian !== null ? vegetarian === "true" : null);
    setSorting(sorting !== null ? sorting : null);
    setPage(page !== null ? parseInt(page) : 1);

    const paramsToRequest = {};

    if (categories.length > 0) {
      paramsToRequest.categories = categories.join("&categories=");
    }

    if (vegetarian !== null) {
      paramsToRequest.vegetarian = vegetarian;
    }

    if (sorting) {
      paramsToRequest.sorting = sorting;
    }

    if (page) {
      paramsToRequest.page = page;
    }

    console.log("Sending request with parameters:", paramsToRequest);

    dispatch(fetchMenu(paramsToRequest));
  }, [dispatch, location]);

  const handleChange = (name: string, value: string | boolean) => {
    if (name === "categories" || name === "vegetarian") {
      params.delete("page");
    }
    if (value === "") {
      params.delete(name);
    } else {
      params.set(name, value.toString());
    }
    setParams(params);
  };

  if (menu.loading === "pending") {
    return <div>Loading...</div>;
  }

  if (menu.loading === "failed") {
    return <div>Error: {menu.error}</div>;
  }
  const generatePageNumbers = () => {
    const pageNumbers = [];
    for (let i = page - 1; i <= page + 1; i++) {
      if (i > 0 && i <= menu.pagination.count) {
        pageNumbers.push(i);
      }
    }
    return pageNumbers;
  };

  return (
    <div>
      <div className={s.SelectorsBlock}>
        <div className={s.Selector}>
          <label>Категории:</label>
          <select
            value={categories}
            onChange={(e) => handleChange("categories", e.target.value)}
          >
            <option value="Wok">Воки</option>
            <option value="Pizza">Пицца</option>
            <option value="Soup">Супы</option>
            <option value="Dessert">Десерты</option>
            <option value="Drink">Напитки</option>
          </select>
        </div>

        <div className={s.Selector}>
          <label>Вегетерианское:</label>
          <input
            type="checkbox"
            checked={vegetarian}
            onChange={(e) => handleChange("vegetarian", e.target.checked)}
          />
        </div>
        <div className={s.Selector}>
          <label>Сортировка:</label>
          <select
            value={sorting}
            onChange={(e) => handleChange("sorting", e.target.value)}
          >
            <option value="NameAsc">А-Я</option>
            <option value="NameDesc">Я-А</option>
            <option value="PriceAsc">Сначала дешевле</option>
            <option value="PriceDesc">Сначала дороже</option>
            <option value="RatingAsc">По возрастанию рейтинга</option>
            <option value="RatingDesc">По убыванию рейтинга</option>
          </select>
        </div>
      </div>
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
      <div className={s.Pagination}>
        <button
          onClick={() => handleChange("page", page > 1 ? page - 1 : 1)}
          disabled={page <= 1}
        >
          &lt;
        </button>
        {generatePageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handleChange("page", pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={() =>
            handleChange("page", page < menu.pagination.count ? page + 1 : page)
          }
          disabled={page >= menu.pagination.count}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default MenuList;
