import { createSlice } from "@reduxjs/toolkit";
import { fetchCart } from "./thunk";

import { initialState } from "./state";

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
