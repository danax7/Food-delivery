import { fetchCart } from "@/modules/UserCart/Model/thunk";
import { AppDispatch } from "@/store/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CartItemList from "../components/CartItemsList/CartItemsList";

const UserCartPage = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <div>
      <CartItemList withButton={true} />
    </div>
  );
};
export default UserCartPage;
