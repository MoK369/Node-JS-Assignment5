// @ts-check
import { PostsModel } from "../../db/models/posts.model.js";
import { CustomError } from "../../utils/custom_error.js";

export const createPost = async (req, res, next) => {
  try {
    const { title, content, userId } = req.body;
    const instance = PostsModel.build({ title, content, userId });
    const result = await instance.save();
    return res
      .status(201)
      .json({ success: true, message: "post created!", post: result });
  } catch (error) {
    next(error);
  }
};
export const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const { userId } = req.body;

    const post = await PostsModel.findByPk(postId);

    if (!post) {
      throw new CustomError("Post not found", 404);
    }
    // @ts-ignore
    if (post.userId !== userId) {
      throw new CustomError("You are not authorized to delete this post", 403);
    }
    const result = PostsModel.destroy({ where: { id: postId } });
    //const result = await instance.save();
    return res.status(200).json({ success: true, message: "post deleted!" });
  } catch (error) {
    next(error);
  }
};
export const getAllPostsDetails = async (req, res, next) => {
  try {
    const posts = await PostsModel.findAll({ attributes: ["id", "title"] });

    if (!posts) {
      throw new CustomError("No posts found", 404);
    }
    return res.status(200).json({ success: true, body: posts });
  } catch (error) {
    next(error);
  }
};
