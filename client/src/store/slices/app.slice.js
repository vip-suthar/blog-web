import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import localforage from "localforage";
import Cookies from "js-cookie";

import instance from "../../utils/api";

const initialState = {
  user: null,
};

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: (create) => ({
    checkSigninStatus: create.asyncThunk(
      async (arg, thunkAPI) => {
        const data = await localforage.getItem("user");
        if (!data) {
          const token = Cookies.get("authToken");
          if (!token) return thunkAPI.rejectWithValue("Not Logged in");
          const { data } = await instance.get("/user", {
            headers: { Authorization: `${token}` },
          });
          if (!data.success) return thunkAPI.rejectWithValue("Not Logged in");
          return data.data;
        }
        console.log(data);
        return data;
      },
      {
        pending: (state) => {},
        rejected: (state, action) => {
          state.user = null;
        },
        fulfilled: (state, action) => {
          state.user = action.payload;
        },
      }
    ),
    logout: create.asyncThunk(
      async (_arg, thunkAPI) => {
        await localforage.removeItem("user");
        Cookies.remove("authToken");
      },
      {
        pending: (state) => {},
        rejected: (state, action) => {
          state.user = null;
        },
        fulfilled: (state, action) => {
          state.user = null;
        },
      }
    ),
    signin: create.asyncThunk(
      async (arg, thunkAPI) => {
        const { data } = await instance.post("/signin", arg);
        if (data.success) {
          await localforage.setItem("user", data.data);
          Cookies.set("authToken", data.data.token);
        }
        return data.data;
      },
      {
        pending: (state) => {},
        rejected: (state, action) => {
          state.user = null;
        },
        fulfilled: (state, action) => {
          state.user = action.payload;
        },
      }
    ),
    signup: create.asyncThunk(
      async (arg, thunkAPI) => {
        const { data } = await instance.post("/signup", arg);
        if (data.success) {
          await localforage.setItem("user", data.data);
          Cookies.set("authToken", data.data.token);
        }
        return data.data;
      },
      {
        pending: (state) => {},
        rejected: (state, action) => {
          state.user = null;
        },
        fulfilled: (state, action) => {
          state.user = action.payload;
        },
      }
    ),
  }),
});

// Action creators are generated for each case reducer function
export const { signin, signup, logout, checkSigninStatus } = appSlice.actions;

export default appSlice.reducer;
