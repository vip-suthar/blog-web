import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { App as AntdApp } from "antd";

import UnauthenticatedApp from "./UnauthenticatedApp";
import SigninScreen from "./screens/SigninScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";
import DetailScreen from "./screens/DetailScreen";
import Header from "./components/Header";
import BlogModal from "./components/BlogModal";
import { connect } from "react-redux";
import { checkSigninStatus } from "./store/slices/app.slice";
import { createBlog } from "./store/slices/blog.slice";

const App = ({ checkSigninStatus, createBlog }) => {
  // const { state, tryLocalSignin } = useContext(AuthContext);

  useEffect(() => {
    checkSigninStatus();
  }, []);

  return (
    <AntdApp>
      <BrowserRouter>
        <Routes>
          {/* Unauthenticated components */}
          <Route
            element={<UnauthenticatedApp />}
            errorElement={<div>Error</div>}
          >
            <Route path="/signin" element={<SigninScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
          </Route>
          {/* Components with header bar */}
          <Route
            element={
              <div>
                <Header />
                <Outlet />
                <BlogModal
                  onSubmit={(val)=> {
                    createBlog(val);
                    console.log("blog created", val)
                  }}
                  onCancel={()=> {
                    console.log("blog cancel")
                  }}
                />
              </div>
            }
          >
            {/* No need for authentication */}
            <Route path="/" element={<HomeScreen />} />
            <Route path="/blog/:blogId" element={<DetailScreen />} />
            {/* Authenticated */}
            {/* <Route path="/" element={<HomeComp />}>
            <Route path="/blog" element={<div>Blog</div>} />
            <Route path="/profile" element={<div>Profile</div>} />
          </Route> */}
            <Route path="*" element={<div>Path not found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AntdApp>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { checkSigninStatus, createBlog })(App);
