import { MenuState } from "./types";

export const initialState: MenuState = {
  dishes: [],
  pagination: {
    size: 0,
    count: 0,
    current: 0,
  },
  loading: "idle",
  error: null,
};
