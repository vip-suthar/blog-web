import React, { useContext, useEffect } from "react";
import { Avatar, Button, Card, Divider, Flex, Space, Typography } from "antd";
import { DeleteOutlined, EditOutlined, LinkOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

const DetailScreen = ({ location }) => {
  const blog = {
    id: 1,
    title: "Blog 1",
    content: "This is the content of blog 1",
    author: "John Doe",
    date: "2020-01-01",
  };

  useEffect(() => {}, []);

  return (
    <Flex vertical align="center">
      <Title level={2}>{blog.title}</Title>
      <Card key={blog.id} style={{ width: "85%" }}>
        <Flex justify="space-between">
          <Flex gap={16}>
            <Avatar size={48} icon={<UserOutlined />} />
            <Flex vertical>
              <Title level={4} style={{ margin: 0 }}>
                {blog.author}
              </Title>
              <Text type="secondary" style={{ fontSize: "0.9rem", margin: 0 }}>
                {blog.date}
                <b
                  style={{
                    fontSize: "1.4rem",
                    lineHeight: "1",
                    margin: "0 8px",
                    userSelect: "none",
                  }}
                >
                  &bull;
                </b>
                Lorem ipsum dolor sit amet.
              </Text>
            </Flex>
          </Flex>
          <Space.Compact>
            {/* <Button icon={<PlusOutlined />}>Follow</Button> */}
            <Button  icon={<LinkOutlined />} />
            <Button  icon={<EditOutlined />} />
            <Button  icon={<DeleteOutlined />} danger />
          </Space.Compact>
        </Flex>
        <Divider />
        <div>{blog.content}</div>
      </Card>
    </Flex>
  );
};
export default DetailScreen;
