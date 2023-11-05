import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state";
import { fetchMenu } from "./thunk";

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
