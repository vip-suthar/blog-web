import { configureStore } from "@reduxjs/toolkit";

// reducers
import appReducer from "./slices/app.slice";
import blogReducer from "./slices/blog.slice";

const store = configureStore({
  reducer: {
    app: appReducer,
    blog: blogReducer,
  },
});

export default store;
