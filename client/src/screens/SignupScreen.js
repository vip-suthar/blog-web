import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { App, Button, Card, Flex, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";

import { signup } from "../store/slices/app.slice";
import { connect } from "react-redux";

const { Title } = Typography;

const SignupScreen = ({ signup }) => {
  const { message } = App.useApp();

  const onFinish = (values) => {
    console.log("Success:", values);
    signup(({ username, password } = values));
    message.success("Signup Successful");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    // show danger toast
    message.success("Signin Successful");
  };
  return (
    <Card
      title={
        <Title level={3} style={{ textAlign: "center" }}>
          Signup
        </Title>
      }
      style={{ width: 400 }}
    >
      <Form
        name="login"
        initialValues={{
          remember: true,
        }}
        style={{
          maxWidth: 360,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="confirm-password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Sign up
          </Button>
        </Form.Item>
        <Flex align="center" justify="center">
          Don't have an account?&nbsp;&nbsp;
          <Link to="/signin">Signin now!</Link>
        </Flex>
      </Form>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps, { signup })(SignupScreen);
