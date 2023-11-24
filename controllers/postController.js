import Post from "../models/Post.js";

const postController = {
  async createPost(req, res) {
    try {
      const newPost = new Post(req.body);
      await newPost.save();
      res.status(201).json(newPost);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async getAllPosts(req, res) {
    try {
      const posts = await Post.find();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async updatePost(req, res) {
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedPost) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(updatedPost);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async deletePost(req, res) {
    try {
      const deletedPost = await Post.findByIdAndDelete(req.params.id);
      if (!deletedPost) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async getPostById(req, res) {},
};

module.exports = postController;
