import express from "express";
import {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
const router = express.Router();

router.get("/posts", getAllPosts).post("/posts", createPost);
// router.get("/posts", getAllPosts);
router.put("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);

export default router;
