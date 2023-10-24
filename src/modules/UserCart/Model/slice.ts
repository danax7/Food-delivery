import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "./types";

const cartSlice = createSlice({
  name: "cart",
  initialState: [] as CartItem[],
  reducers: {
    addItemToCart(state, action: PayloadAction<CartItem>) {
      state.push(action.payload);
    },
    removeItemFromCart(state, action: PayloadAction<string>) {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});
import axios from "axios";

const BASE_URL = "https://food-delivery.kreosoft.ru";

export const fetchCart = async () => {
  const response = await axios.get<CartItem[]>(`${BASE_URL}/basket`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const addToCart = async (dishId: string) => {
  console.log(dishId);
  console.log(localStorage.getItem("token"));
  await axios.post(`${BASE_URL}/api/basket/dish/${dishId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const removeFromCart = async (dishId: string) => {
  await axios.delete(`${BASE_URL}/api/basket/dish/${dishId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;
