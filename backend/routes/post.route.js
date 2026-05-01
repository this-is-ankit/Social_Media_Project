import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
import { addComment, addNewPost, bookMarkPost, deletePost, dislikePost, getAllPost, getCommentOfPost, getExplorePosts, getScrolls, getUserPost, likePost } from "../controllers/post.controller.js";

const router = express.Router();

router.route("/addpost").post(isAuthenticated , upload.single('image'), addNewPost);
router.route("/all").get(isAuthenticated , getAllPost);
router.route("/explore").get(isAuthenticated, getExplorePosts);
router.route("/scrolls").get(isAuthenticated, getScrolls);
router.route("/userpost/all").get(isAuthenticated , getUserPost);
router.route("/:id/like").get(isAuthenticated , likePost);
router.route("/:id/dislike").get(isAuthenticated , dislikePost);
router.route("/:id/comment").post(isAuthenticated , addComment);
router.route("/:id/comment/all").get(isAuthenticated , getCommentOfPost);
router.route("/delete/:id").delete(isAuthenticated , deletePost);
router.route("/:id/bookmark").get(isAuthenticated , bookMarkPost);  

export default router;