import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DishInfoParams, IDish } from "./types";
import { initialState } from "./state";
import { RootState } from "@/store/store";

export const fetchDish = createAsyncThunk<IDish, DishInfoParams>(
  "dishInfo/fetchDish",
  async (params) => {
    const response = await axios.get(
      `https://food-delivery.kreosoft.ru/api/dish/${params.dishId}`
    );
    return response.data;
  }
);

const dishInfoSlice = createSlice({
  name: "dishInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDish.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchDish.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.dish = action.payload;
      })

      .addCase(fetchDish.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const selectDish = (state: RootState): IDish | null =>
  state.dishInfo.dish;

export const selectDishLoading = (state: RootState): boolean =>
  state.dishInfo.loading === "pending";

export const selectDishError = (state: RootState): string | null =>
  state.dishInfo.error;

export default dishInfoSlice.reducer;
