import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CartItem } from "./types";
import { RootState } from "@/store/store";

const BASE_URL = "https://food-delivery.kreosoft.ru";

export const fetchCart = createAsyncThunk<CartItem[]>(
  "cart/fetchCart",
  async (_, { getState }) => {
    const token = (getState() as RootState).auth.token;
    const response = await axios.get<CartItem[]>(`${BASE_URL}/api/basket`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const addToCart = createAsyncThunk<void, string>(
  "cart/addToCart",
  async (dishId, { getState }) => {
    const token = (getState() as RootState).auth.token;
    await axios.post(
      `${BASE_URL}/api/basket/dish/${dishId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
);

export const removeFromCart = createAsyncThunk<
  void,
  { dishId: string; increase: boolean }
>("cart/removeFromCart", async ({ dishId, increase }, { getState }) => {
  const token = (getState() as RootState).auth.token;
  await axios.delete(`${BASE_URL}/api/basket/dish/${dishId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      increase: increase.toString(),
    },
  });
});
