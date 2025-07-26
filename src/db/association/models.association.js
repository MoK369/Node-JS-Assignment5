// @ts-check
import { PostsModel } from "../models/posts.model.js";
import { UsersModel } from "../models/users.model.js";
import { CommentsModel } from "../models/comments.model.js";

function applyAssociations() {
  UsersModel.hasMany(PostsModel, {
    as: "user",
    foreignKey: {
      name: "userId",
      allowNull: false,
    },
    onDelete: "CASCADE",
  });
  PostsModel.belongsTo(UsersModel, {
    as: "user",
    foreignKey: {
      name: "userId",
      allowNull: false,
    },
    onDelete: "CASCADE",
  });

  UsersModel.hasMany(CommentsModel, {
    foreignKey: {
      name: "userId",
      allowNull: false,
    },
    onDelete: "CASCADE",
  });
  CommentsModel.belongsTo(UsersModel, {
    as:'user',
    foreignKey: {
      name: "userId",
      allowNull: false,
    },
    onDelete: "CASCADE",
  });

  PostsModel.hasMany(CommentsModel, {
    as: "comments",
    foreignKey: {
      name: "postId",
      allowNull: false,
    },
    onDelete: "CASCADE",
  });
  CommentsModel.belongsTo(PostsModel, {
    as: "post",
    foreignKey: {
      name: "postId",
      allowNull: false,
    },
    onDelete: "CASCADE",
  });
}
export default applyAssociations;
