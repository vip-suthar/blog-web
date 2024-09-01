import React from "react";
import { connect } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const UnauthenticatedApp = ({ isLoggedIn }) => {

  if (isLoggedIn) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Outlet />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: !!state.app.user,
  };
};

export default connect(mapStateToProps)(UnauthenticatedApp);
