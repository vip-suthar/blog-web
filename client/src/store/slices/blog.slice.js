import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import instance from "../../utils/api";
import localforage from "localforage";

import Cookies from "js-cookie";

const initialState = {
  blogsList: [],
  blog: null,
  modal: {
    open: false,
    mode: "create",
  },
};

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const appSlice = createSlice({
  name: "blog",
  initialState,
  reducers: (create) => ({
    getAllBlogs: create.asyncThunk(
      async (arg, thunkAPI) => {
        // const token = Cookies.get("authToken");
        const { data } = await instance.get("/blogs", {
          // headers: { Authorization: `${token}` },
        });

        return data.data;
      },
      {
        pending: (state) => {},
        rejected: (state, action) => {
          state.blogsList = [];
        },
        fulfilled: (state, action) => {
          state.blogsList = action.payload;
        },
      }
    ),
    getBlog: create.asyncThunk(
      async (arg, thunkAPI) => {
        // const token = Cookies.get("authToken");
        const { data } = instance.get(`/blog/${arg}`, {
          // headers: { Authorization: `${token}` },
        });

        return data.data;
      },
      {
        pending: (state) => {},
        rejected: (state, action) => {
          state.blog = null;
        },
        fulfilled: (state, action) => {
          state.blog = action.payload;
        },
      }
    ),
    createBlog: create.asyncThunk(
      async (arg, thunkAPI) => {
        const token = Cookies.get("authToken");
        const { data } = await instance.post(`/blog`, arg, {
          headers: { Authorization: `${token}` },
        });
        return data.data;
      },
      {
        pending: (state) => {},
        rejected: (state, action) => {
          state.blog = null;
        },
        fulfilled: (state, action) => {
          state.blogsList.push(action.payload);
        },
      }
    ),
    updateBlog: create.asyncThunk(
      async (arg, thunkAPI) => {
        const token = Cookies.get("authToken");
        const { data } = await instance.put(`/blog/${arg.blogId}`, arg.data, {
          headers: { Authorization: `${token}` },
        });
        return data.data;
      },
      {
        pending: (state) => {},
        rejected: (state, action) => {
          state.blog = null;
        },
        fulfilled: (state, action) => {
          const idx = state.blogsList.findIndex(
            (blog) => action.payload._id === blog._id
          );
          state.blogsList[idx] = action.payload;
          if (state.blog._id === action.payload._id)
            state.blog = action.payload;
        },
      }
    ),
    deleteBlog: create.asyncThunk(
      async (arg, thunkAPI) => {
        const token = Cookies.get("authToken");
        const { data } = await instance.delete(`/blog/${arg.blogId}`, {
          headers: { Authorization: `${token}` },
        });
        return data.data;
      },
      {
        pending: (state) => {},
        rejected: (state, action) => {
          state.user = null;
        },
        fulfilled: (state, action) => {
          state.blogsList.filter((blog) => action.payload._id !== blog._id);
          if (state.blog._id === action.payload._id) state.blog = null;
        },
      }
    ),
    openCreateBlogModal: create.reducer((state) => {
      state.modal.open = true;
      state.modal.type = "create";
    }),
    openEditBlogModal: create.reducer((state) => {
      state.modal.open = true;
      state.modal.type = "edit";
    }),
    closeBlogModal: create.reducer((state) => {
      state.modal.open = false;
      state.modal.type = "create";
    }),
  }),
});

// Action creators are generated for each case reducer function
export const {
  getAllBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  openCreateBlogModal,
  openEditBlogModal,
  closeBlogModal,
} = appSlice.actions;

export default appSlice.reducer;
