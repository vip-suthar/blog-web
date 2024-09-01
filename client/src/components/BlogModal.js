import React, { useEffect, useRef, useState } from "react";
import { Button, Flex, Input, Modal, Space, Typography } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { closeBlogModal } from "../store/slices/blog.slice";
import { connect } from "react-redux";

const BlogModal = ({
  open,
  mode,
  closeBlogModal,
  blog,
  onSubmit,
  onCancel,
}) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const ref = useRef(null);

  const handleOk = () => {
    console.log(ref.current.value);
    // ref.current?.unprivilegedEditor?.getContents()
    // handleOk(ref.current.value, ref.current?.unprivilegedEditor?.getContents())
    onSubmit({ title, image, content: ref.current.value });
    closeBlogModal();
  };
  const handleCancel = () => {
    onCancel();
    closeBlogModal();
  };

  return (
    <Modal
      title="Blog"
      okText={mode === "create" ? "Create" : "Edit"}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Flex vertical gap={16} style={{ padding: 16 }}>
        <Input
          placeholder="Enter blog title..."
          value={title}
          onChange={(e)=>{
            setTitle(e.target.value);
          }}
        />
        <Space.Compact>
          <Input
            placeholder="Enter image link..."
            value={image}
            onChange={(e)=>{
              setImage(e.target.value);
            }}
          />
          {/* <Button>Pick Image</Button> */}
        </Space.Compact>
        <ReactQuill theme="snow" defaultValue={blog} ref={ref} />
      </Flex>
    </Modal>
  );
};

const mapStateToProps = (state, props) => {
  return {
    ...props,
    blog: state.blog.blog,
    open: state.blog.modal.open,
    mode: state.blog.modal.mode,
  };
};

export default connect(mapStateToProps, { closeBlogModal })(BlogModal);
