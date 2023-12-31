import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthData } from "./types";
import { setToken, clearToken } from "./slice";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data: AuthData, { dispatch }) => {
    try {
      const response = await axios.post(
        "https://food-delivery.kreosoft.ru/api/account/login",
        data
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("email", data.email);
      console.log("token", response.data);

      dispatch(setToken(token));
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Login failed");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { dispatch }) => {
    try {
      const response = await axios.post(
        "https://food-delivery.kreosoft.ru/api/account/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      localStorage.getItem("token");
      console.log(response.data, "logout");

      dispatch(clearToken());
    } catch (error) {
      console.error("Logout failed:", error);
      if (
        (error.response && error.response.status === 403) ||
        (error.response && error.response.status === 401)
      ) {
        dispatch(clearToken());
      }
    }
  }
);
