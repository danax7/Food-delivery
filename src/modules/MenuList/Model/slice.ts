import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { initialState } from "./state";
import { MenuState } from "./types";

interface FetchMenuParams {
  categories: string[];
  vegetarian: boolean;
  page: number;
  sorting: string;
}

export const fetchMenu = createAsyncThunk<MenuState, FetchMenuParams>(
  "menu/fetchMenu",
  async (params) => {
    let query = "";
    if (params.categories) {
      params.categories.forEach((item) => {
        query += `categories=${item}&`;
      });
    }

    const response = await axios.get(
      `https://food-delivery.kreosoft.ru/api/dish?${query}`,
      {
        params: {
          vegetarian: params.vegetarian,
          sorting: params.sorting,
          page: params.page,
        },
      }
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
