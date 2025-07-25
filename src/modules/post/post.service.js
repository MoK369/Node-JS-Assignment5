// @ts-check
import { Sequelize } from "sequelize";
import { CommentsModel } from "../../db/models/comments.model.js";
import { PostsModel } from "../../db/models/posts.model.js";
import { UsersModel } from "../../db/models/users.model.js";
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
    return res.status(200).json({ success: true, message: "post deleted!" });
  } catch (error) {
    next(error);
  }
};
export const getAllPostsDetails = async (req, res, next) => {
  try {
    const posts = await PostsModel.findAll({
      attributes: ["id", "title"],
      include: [
        { model: UsersModel, as: "user", attributes: ["id", "name"] },
        { model: CommentsModel, as: "comments", attributes: ["id", "content"] },
      ],
    });

    if (!posts) {
      throw new CustomError("No posts found", 404);
    }
    return res.status(200).json({ success: true, body: posts });
  } catch (error) {
    next(error);
  }
};
export const getAllPostsWithCommentsCount = async (req, res, next) => {
  try {
    const posts = await PostsModel.findAll({
      attributes: [
        "id",
        "title",
        [Sequelize.fn("COUNT", Sequelize.col("comments.id")), "commentsCount"],
      ],
      include: [
        {
          model: CommentsModel,
          as: "comments",
          attributes: [],
          required: false,
        },
      ],
      group: ["Post.id"],
    });

    if (!posts) {
      throw new CustomError("No posts found", 404);
    }
    return res.status(200).json({ success: true, body: posts });
  } catch (error) {
    next(error);
  }
};
