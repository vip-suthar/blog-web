import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  App,
  Button,
  Card,
  Checkbox,
  Flex,
  Form,
  Input,
  Typography,
} from "antd";

import { signin } from "../store/slices/app.slice";

const { Title } = Typography;

const SigninScreen = ({ signin }) => {
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    setLoading(true);

    signin(values);

    // message.success("Signin Successful");
    setLoading(false);
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
          Signin
        </Title>
      }
      style={{ width: 400 }}
    >
      <Form
        name="signin"
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
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a href="">Forgot password</a>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit" loading={loading}>
            Sign in
          </Button>
        </Form.Item>
        <Flex align="center" justify="center">
          Don't have an account?&nbsp;&nbsp;
          <Link to="/signup">Signup now!</Link>
        </Flex>
      </Form>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { signin })(SigninScreen);
