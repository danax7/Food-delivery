import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "@/modules/MenuList/Model/slice";
import dishInfoReducer from "@/modules/DishInfo/Model/slice";
import authSlice from "@/modules/Auth/Model/slice";
export const store = configureStore({
  reducer: {
    menu: menuReducer,
    dishInfo: dishInfoReducer,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
