import { Router } from "express";
import * as commentService from "./comment.service.js";

const commentRouter = Router();

commentRouter.post("/create-bulk", commentService.createBulkOfComments);
commentRouter.patch("/:id", commentService.updateCommentContent);
commentRouter.post("/find-or-create", commentService.findOrCreateComment);
commentRouter.get("/search", commentService.searchInComments);
commentRouter.get("/newest/:postId", commentService.getThreeNewestCommentsForAPost);
commentRouter.get("/details/:id", commentService.getCommentDetails);

export default commentRouter