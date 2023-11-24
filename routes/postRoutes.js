import express from "express";
import postController from "../controllers/postController.js";
const router = express.Router();

router.post("/posts", postController.createPost);
router.get("/posts", postController.getAllPosts);
router.put("/posts/:id", postController.updatePost);
router.delete("/posts/:id", postController.deletePost);

module.exports = router;
