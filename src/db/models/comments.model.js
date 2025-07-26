// @ts-check
import { DataTypes } from "sequelize";
import { sequelize } from "../db.connection.js";
import { CustomError } from "../../utils/custom_error.js";

export const CommentsModel = sequelize.define("Comment", {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      checkContentLength(value) {
        if (value.length <= 10) {
          throw new Error("Content of post is too short");
        }
      },
    },
  },
});
CommentsModel.addHook("beforeBulkUpdate", (data) => {
  //@ts-ignore
  if (!data.attributes.content) {
    throw new CustomError("No content provided", 400);
  }
});
