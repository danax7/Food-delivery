import { fetchMenu } from "@/modules/MenuList/Model/slice";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const MenuComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const menu = useSelector((state: RootState) => state.menu);

  useEffect(() => {
    dispatch(fetchMenu({ categories: "Drink", vegetarian: true, page: 1 }));
  }, [dispatch]);

  if (menu.loading === "pending") {
    return <div>Loading...</div>;
  }

  if (menu.loading === "failed") {
    return <div>Error: {menu.error}</div>;
  }

  return (
    <div>
      {menu.dishes.map((dish) => (
        <div key={dish.id}>
          <h2>{dish.name}</h2>
          <p>{dish.description}</p>
          <p>Price: {dish.price}</p>
        </div>
      ))}
    </div>
  );
};

export default MenuComponent;
