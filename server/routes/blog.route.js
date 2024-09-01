const express = require("express");
const mongoose = require("mongoose");

const withAuthRouter = express.Router();
const withoutAuthRouter = express.Router();

const Blog = mongoose.model("Blog");

withoutAuthRouter.get("/blogs", async (req, res) => {
  try {
    // const userId = res.locals.userId;
    console.log("here");
    const blogs = await Blog.find().select("-content");
    res.json({success: true, data: blogs});
  } catch (error) {
    res.status(500).json({success: false, data: "Some Error Occured"});
  }
});

withoutAuthRouter.get("/blog/:blogId", async (req, res) => {
  try {
    const blogId = req.params?.blogId;
    const blog = await Blog.findById(blogId);
    res.json({success: true, data: blog});
  } catch (error) {
    res.status(500).json({success: false, data: "Some Error Occured"});
  }
});

withAuthRouter.post("/blog", async (req, res) => {
  const { title, content, image } = req.body;
  const userId = res.locals.userId;

  if (!title || !content) {
    return res
      .status(422)
      .json({ success: false, data: "You must provide a title and a content" });
  }

  try {
    const blog = new Blog({ title, content, userId, image });
    await blog.save();
    res.json({success: true, data: blog});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

withAuthRouter.delete("/blog/:blogId", async (req, res) => {
  const blogId = req.params.blogId;

  try {
    await Blog.deleteOne({ _id: blogId });
    res.json({success: true, data: "Blog deleted successfully"})
  } catch (err) {
    res.status(500).send({ success: false, data: "Some err occured" });
  }
});

withAuthRouter.put("/blog/:blogId", async (req, res) => {
  const blogId = req.params.blogId;
  const { title, content, image } = req.body;
  try {
    await Blog.updateOne({_id: blogId}, {title, content, image});
    const blog = await Blog.findById(blogId)
    res.json({success: false, data: blog});
  } catch (err) {
    res.status(500).send({ success: false, data: "Some error occured" });
  }
});

module.exports = {withAuthRouter, withoutAuthRouter};
