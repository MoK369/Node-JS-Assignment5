// @ts-check
import { Router } from "express";
import * as postService from "./post.service.js";

const postRouter = Router();

postRouter.post('/',postService.createPost);
postRouter.delete('/:id',postService.deletePost);
postRouter.get('/all-posts-details',postService.getAllPostsDetails);
postRouter.get('/all-posts-comments-count',postService.getAllPostsWithCommentsCount);

export default postRouter;