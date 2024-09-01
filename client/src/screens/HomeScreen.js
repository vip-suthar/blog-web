import {
  DeleteOutlined,
  EditOutlined,
  LinkOutlined,
  MoreOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Dropdown,
  Empty,
  Flex,
  Typography,
} from "antd";
import React, { Suspense, lazy, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { getAllBlogs } from "../store/slices/blog.slice";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;
// import Spinner from '../components/Spinner';

const HomeScreen = ({ blogsList, getAllBlogs }) => {
  const navigate = useNavigate()
  // const blogsList = [
  //   {
  //     id: 1,
  //     title: "Blog 1",
  //     content: "This is the content of blog 1",
  //     author: "John Doe",
  //     date: "2020-01-01",
  //   },
  //   {
  //     id: 2,
  //     title: "Blog 2",
  //     content: "This is the content of blog 2",
  //     author: "John Doe",
  //     date: "2020-01-01",
  //   },
  //   {
  //     id: 3,
  //     title: "Blog 3",
  //     content: "This is the content of blog 3",
  //     author: "John Doe",
  //     date: "2020-01-01",
  //   },
  //   {
  //     id: 4,
  //     title: "Blog 4",
  //     content: "This is the content of blog 4",
  //     author: "John Doe",
  //     date: "2020-01-01",
  //   },
  // ];

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <Flex vertical align="center">
      {blogsList.length === 0 ? (
        <Empty description="No blogs available" />
      ) : (
        <Flex vertical gap={8} align="center" justify="space-around">
          {blogsList.map((blog) => (
            <Card
              key={blog._id}
              style={{ width: "85%" }}
              onClick={() => {
                console.log(blog._id);
                navigate(`/blog/${blog._id}`)
              }}
            >
              <Flex justify="space-between">
                <Flex vertical gap={8}>
                  <Flex gap={16}>
                    <Avatar size={48} icon={<UserOutlined />} />
                    <Flex vertical>
                      <Title level={4} style={{ margin: 0 }}>
                        {blog.author || "John Doe"}
                      </Title>
                      <Text style={{ fontSize: "0.9rem", margin: 0 }}>
                        {blog.date || "01-09-2024"}
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
                  <Text type="secondary" style={{ margin: "0 64px" }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras efficitur blandit feugiat. Morbi finibus nisl et justo
                    euismod mollis. Sed vestibulum mauris in lectus ullamcorper
                    consequat.
                  </Text>
                </Flex>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Dropdown
                    menu={{
                      items: [
                        {
                          icon: <LinkOutlined />,
                          label: "Copy Link",
                          key: "link",
                          onClick: (i) => {
                            console.log(i);
                          },
                        },
                        {
                          icon: <EditOutlined />,
                          label: "Edit",
                          key: "edit",
                        },
                        {
                          icon: <DeleteOutlined />,
                          danger: true,
                          label: "Delete",
                          key: "delete",
                        },
                      ],
                    }}
                    trigger={["click"]}
                  >
                    <Button shape="circle" icon={<MoreOutlined />} />
                  </Dropdown>
                </div>
              </Flex>
            </Card>
          ))}
        </Flex>
      )}
      {/* {state.map((blog) => (
        <Suspense key={blog._id} fallback={<Spinner />}>
          <BlogDetail {...blog} onDelete={deleteBlog} />
        </Suspense>
      ))} */}
    </Flex>
  );
};

const mapStateToProps = (state) => {
  return {
    isUserLoggedIn: !!state.app.user,
    blogsList: state.blog.blogsList,
  };
};

export default connect(mapStateToProps, { getAllBlogs })(HomeScreen);
