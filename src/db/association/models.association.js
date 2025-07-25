// @ts-check
import { PostsModel } from "../models/posts.model.js";
import { UsersModel } from "../models/users.model.js";
import { CommentsModel } from "../models/comments.model.js";

function applyAssociations() {
  UsersModel.hasMany(PostsModel, {
    foreignKey: {
      name: "userId",
      allowNull: false,
    },
    onDelete: "CASCADE",
  });
  PostsModel.belongsTo(UsersModel, {
    foreignKey: {
      name: "userId",
      allowNull: false,
    },
    onDelete: "CASCADE",
  });

  UsersModel.hasMany(CommentsModel, {
    foreignKey: {
        name: "userId",
        allowNull: false
    },
    onDelete: "CASCADE",
  });
  CommentsModel.belongsTo(UsersModel, {
    foreignKey: {
        name: "userId",
        allowNull: false
    },
    onDelete: "CASCADE",
  });

  PostsModel.hasMany(CommentsModel, {
    foreignKey: {
        name: "postId",
        allowNull: false
    },
    onDelete: "CASCADE",
  });
  CommentsModel.belongsTo(PostsModel, {
    foreignKey: {
        name: "postId",
        allowNull: false
    },
    onDelete: "CASCADE",
  });
}
export default applyAssociations;
