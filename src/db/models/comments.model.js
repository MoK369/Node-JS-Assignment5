// @ts-check
import { DataTypes } from "sequelize";
import { sequelize } from "../db.connection.js";

export const CommentsModel = sequelize.define("Comment", {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export async function createCommentsInstance({ content, postId, userId }) {
  return await CommentsModel.create({ content, postId, userId });
}
