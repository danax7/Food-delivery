import { createSelector, createSlice } from "@reduxjs/toolkit";
import { fetchCart } from "./thunk";

import { initialState } from "./state";
import { RootState } from "@/store/store";
import { CartItem } from "./types";

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export default cartSlice.reducer;
export const selectCartItems = createSelector(
  (state: RootState) => state.cart.items,
  (items: CartItem[]) => items
);
