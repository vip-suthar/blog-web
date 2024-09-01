import React from "react";

import { Avatar, Button, Dropdown, Flex, Image } from "antd";
import { UserOutlined } from "@ant-design/icons";

import LogoImage from "../../public/logo.png";
import { connect } from "react-redux";
import { logout } from "../store/slices/app.slice";
import { useNavigate } from "react-router-dom";
import { openCreateBlogModal } from "../store/slices/blog.slice";

const Header = ({ user, openCreateBlogModal, logout }) => {
  const navigate = useNavigate();
  const isSignin = !!user;

  return (
    <Flex
      justify="space-between"
      align="center"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        background: "#ffffff",
        padding: "8px 16px",
        marginBottom: 16,
        borderBottom: "1px solid rgb(240, 240, 240)",
      }}
    >
      <img
        width={60}
        src={LogoImage}
        alt={"Vipin's Blog Website. Warning!!!"}
      />

      {isSignin ? (
        <Flex gap={16}>
          <Button
            type="primary"
            onClick={() => {
              openCreateBlogModal();
            }}
          >
            Publish
          </Button>
          <Dropdown
            menu={{
              items: [
                {
                  label: user?.username,
                  key: "username",
                },
                {
                  type: "divider",
                },
                {
                  label: "Logout",
                  key: "logout",
                  onClick: () => {
                    logout();
                  },
                },
              ],
            }}
            trigger={["click"]}
          >
            <Avatar icon={<UserOutlined />} />
          </Dropdown>
        </Flex>
      ) : (
        <Flex gap={8}>
          <Button
            type="primary"
            ghost
            onClick={() => {
              navigate("/signup");
            }}
          >
            Signup
          </Button>
          <Button
            type="primary"
            onClick={() => {
              navigate("/signin");
            }}
          >
            Signin
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

const mapStateToProps = (state, props) => {
  return {
    ...props,
    user: state.app.user,
  };
};

export default connect(mapStateToProps, { logout, openCreateBlogModal })(
  Header
);
