import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
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
