import { selectCartItems } from "@/modules/UserCart/Model/slice";
import {
  fetchCart,
  addToCart,
  removeFromCart,
} from "@/modules/UserCart/Model/thunk";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItemList from "../components/CartItemsList/CartItemsList";

const UserCartPage = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const cartItems = useSelector((state: RootState) => selectCartItems(state));
  console.log(cartItems);

  return (
    <div>
      <CartItemList />
    </div>
  );
};
export default UserCartPage;
