import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { initialState } from "./state";
import { MenuState } from "./types";

interface FetchMenuParams {
  categories: string;
  vegetarian: boolean;
  page: number;
  sorting: string;
}

export const fetchMenu = createAsyncThunk<MenuState, FetchMenuParams>(
  "menu/fetchMenu",
  async (params) => {
    console.log(params);
    const response = await axios.get(
      "https://food-delivery.kreosoft.ru/api/dish",
      { params }
    );
    return response.data;
  }
);

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.dishes = action.payload.dishes;

        state.pagination = action.payload.pagination;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      });
  },
});

export default menuSlice.reducer;
