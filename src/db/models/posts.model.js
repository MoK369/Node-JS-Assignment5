// @ts-check
import { CustomError } from "../../utils/custom_error.js";
import { sequelize } from "../db.connection.js";
import { DataTypes } from "sequelize";

export const PostsModel = sequelize.define(
  "Post",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        checkTitleLength(value) {
          if (value.length <= 2) {
            throw new Error("Title length must be greater than 2 characters!");
          }
        },
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    paranoid: true,
  }
);

PostsModel.addHook("beforeCreate", (post) => {
  // @ts-ignore
  if (typeof post.userId != "number") {
    throw new CustomError("userId must be a number", 400);
  }
});
