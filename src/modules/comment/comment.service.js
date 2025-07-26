// @ts-check
import { Op } from "sequelize";
import { CommentsModel } from "../../db/models/comments.model.js";
import { CustomError } from "../../utils/custom_error.js";
import { UsersModel } from "../../db/models/users.model.js";
import { PostsModel } from "../../db/models/posts.model.js";

export const createBulkOfComments = async (req, res, next) => {
  try {
    const body = req.body;
    if (!Array.isArray(body)) {
      throw new CustomError(
        "You must send in body list of comments objects",
        400
      );
    }
    if (body.length == 0) {
      throw new CustomError("List of comments is empty", 400);
    }
    console.log({ body });

    const comments = body.map((comment) => {
      const { userId, postId, content } = comment;
      return { userId, postId, content };
    });

    const result = await CommentsModel.bulkCreate(comments, {
      validate: true,
      hooks: true,
    });
    return res
      .status(201)
      .json({ success: true, message: "Comments Created!", body: result });
  } catch (error) {
    next(error);
  }
};
export const updateCommentContent = async (req, res, next) => {
  try {
    const { userId, content } = req.body;
    const commentId = req.params.id;
    console.log({ commentId });

    const comment = await CommentsModel.findByPk(commentId);
    if (!comment) {
      throw new CustomError("comment is not found", 404);
    }
    // @ts-ignore
    if (comment.userId != userId) {
      throw new CustomError(
        "You are not authorized to update this comment",
        403
      );
    }

    const result = await CommentsModel.update(
      {
        content: content,
      },
      {
        where: {
          id: commentId,
        },
        validate: true,
      }
    );
    return res.json({ success: true, message: "Comments Updated!" });
  } catch (error) {
    next(error);
  }
};
export const findOrCreateComment = async (req, res, next) => {
  try {
    const { postId = null, userId = null, content = null } = req.body;

    const result = await CommentsModel.findOrCreate({
      where: {
        postId,
        userId,
        content,
      },
    });
    return res.json({
      success: true,
      body: { comment: result[0], created: result[1] },
    });
  } catch (error) {
    next(error);
  }
};
export const searchInComments = async (req, res, next) => {
  try {
    const { word, pageSize = 5, page = 1 } = req.query;
    let limitNum = Number(pageSize);
    let pageNum = Number(page);
    if (page <= 0) {
      throw new CustomError("page number must be greater than 0", 400);
    }

    if (!word) {
      throw new CustomError("`word` query is missing", 400);
    }
    const result = await CommentsModel.findAndCountAll({
      where: { content: { [Op.like]: `%${word}%` } },
      limit: limitNum,
      offset: (pageNum - 1) * limitNum,
    });
    return res.json({
      success: true,
      body: {
        totalPages: Math.ceil(result.count / limitNum),
        currentPage: pageNum,
        pageSize: limitNum,
        count: result.count,
        comments: result.rows,
      },
    });
  } catch (error) {
    next(error);
  }
};
export const getThreeNewestCommentsForAPost = async (req, res, next) => {
  try {
    const { postId = null } = req.params;

    const result = await CommentsModel.findAll({
      where: { postId: postId },
      attributes: ["id", "content", "createdAt"],
      limit: 3,
      order: [["createdAt", "DESC"]],
    });
    return res.json({
      success: true,
      body: result,
    });
  } catch (error) {
    next(error);
  }
};
export const getCommentDetails = async (req, res, next) => {
  try {
    const { id = null } = req.params;

    const result = await CommentsModel.findOne({
      where: { id: id },
      attributes: ["id", "content"],
      include: [
        {
          model: UsersModel,
          as: "user",
          attributes: ["id", "name", "email"],
        },
        {
          model: PostsModel,
          as: "post",
          attributes: ["id", "title", "content"],
        },
      ],
    });
    return res.json({
      success: true,
      body: result,
    });
  } catch (error) {
    next(error);
  }
};
