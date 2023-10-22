import React, { useEffect, useState } from "react";
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
  const [categories, setCategories] = useState<string[]>([]);
  const [vegetarian, setVegetarian] = useState<boolean | null>(null);
  const [sorting, setSorting] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

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
    setVegetarian(vegetarian !== null ? vegetarian === "false" : null);
    setSorting(sorting !== null ? sorting : null);
    setPage(page !== null ? parseInt(page) : 1);

    const categoriesString = categories.join(",");
    const sortingString = sorting !== null ? sorting : "";

    console.log("Sending request with parameters:");
    console.log("Categories:", categoriesString);
    console.log("Vegetarian:", vegetarian);
    console.log("Sorting:", sortingString);
    console.log("Page:", page);

    dispatch(
      fetchMenu({
        categories: categoriesString,
        vegetarian: vegetarian,
        sorting: sortingString,
        page: page !== null ? parseInt(page) : 1,
      })
    );
  }, [dispatch, location]);

  const updateQueryParams = () => {
    const searchParams = new URLSearchParams();

    if (categories.length > 0) {
      categories.forEach((category) =>
        searchParams.append("categories", category)
      );
    }

    if (vegetarian !== null) {
      searchParams.set("vegetarian", vegetarian.toString());
    }

    if (sorting.length > 0) {
      sorting.forEach((sort) => searchParams.append("sorting", sort));
    }

    if (page > 1) {
      searchParams.set("page", page.toString());
    }

    const queryParamsString = searchParams.toString();

    if (queryParamsString.length > 0) {
      return `?${queryParamsString}`;
    }

    return "";
  };

  const handleCategoriesChange = (selectedCategories: string[]) => {
    setCategories(selectedCategories);
    const queryParams = updateQueryParams();
    dispatch(
      fetchMenu({
        categories: selectedCategories.join(","),
        vegetarian,
        sorting: sorting.join(","),
        page,
      })
    );
    window.history.pushState({}, "", `?${queryParams}`);
  };

  const handleVegetarianChange = (isChecked: boolean) => {
    setVegetarian(isChecked);
    const queryParams = updateQueryParams();
    dispatch(
      fetchMenu({
        categories: categories.join(","),
        vegetarian: isChecked,
        sorting: sorting.join(","),
        page,
      })
    );
    window.history.pushState({}, "", `?${queryParams}`);
  };

  const handleSortingChange = (selectedSorting: string[]) => {
    setSorting(selectedSorting);
    const queryParams = updateQueryParams();
    dispatch(
      fetchMenu({
        categories: categories.join(","),
        vegetarian,
        sorting: selectedSorting.join(","),
        page,
      })
    );
    window.history.pushState({}, "", `?${queryParams}`);
  };

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
    const queryParams = updateQueryParams();
    dispatch(
      fetchMenu({
        categories: categories.join(","),
        vegetarian,
        sorting: sorting.join(","),
        page: selectedPage,
      })
    );
    window.history.pushState({}, "", `?${queryParams}`);
  };

  if (menu.loading === "pending") {
    return <div>Loading...</div>;
  }

  if (menu.loading === "failed") {
    return <div>Error: {menu.error}</div>;
  }

  return (
    <div className={s.MenuList}>
      <div className={s.Selector}>
        <label>Categories:</label>
        <select
          value={categories}
          onChange={(e) =>
            handleCategoriesChange(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
          multiple
        >
          <option value="Wok">Wok</option>
          <option value="Pizza">Pizza</option>
          <option value="Soup">Soup</option>
          <option value="Dessert">Dessert</option>
          <option value="Drink">Drink</option>
        </select>
      </div>
      <div className={s.Selector}>
        <label>Vegetarian:</label>
        <input
          type="checkbox"
          checked={vegetarian === true}
          onChange={(e) => handleVegetarianChange(e.target.checked)}
        />
      </div>
      <div className={s.Selector}>
        <label>Sorting:</label>
        <select
          value={sorting}
          onChange={(e) =>
            handleSortingChange(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
          multiple
        >
          <option value="NameAsc">NameAsc</option>
          <option value="NameDesc">NameDesc</option>
          <option value="PriceAsc">PriceAsc</option>
          <option value="PriceDesc">PriceDesc</option>
          <option value="RatingAsc">RatingAsc</option>
          <option value="RatingDesc">RatingDesc</option>
        </select>
      </div>
      <div className={s.Selector}>
        <label>Page:</label>
        <input
          type="number"
          value={page}
          onChange={(e) => handlePageChange(parseInt(e.target.value))}
        />
      </div>

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
