// @ts-check
// @ts-ignore
import { DataTypes, SequelizeScopeError } from "sequelize";
import { sequelize } from "../db.connection.js";
import { CustomError } from "../../utils/custom_error.js";
export const UsersModel = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isAlpha: {
        msg: "Name must be letters not numbers",
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    unique: {
      name: "email",
      msg: "Email already exists",
    },
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      checkPasswordLength(value) {
        if (value.length <= 6) {
          throw new Error("Password must be greater than 6 characters!");
        }
      },
    },
  },
  role: {
    type: DataTypes.ENUM("user", "admin"),
    defaultValue: "user",
    validate: {
      isIn: {
        args: [["user", "admin"]],
        msg: "role must be user or admin",
      },
    },
  },
});

UsersModel.addHook("beforeCreate", (user)=>{
   // @ts-ignore
   if (user.name.length <= 2) {
    throw new CustomError(
      "Name length must be greater than 2 characters!",
      400
    );
  }
});
UsersModel.addHook("beforeBulkUpdate", (user)=>{
  // @ts-ignore
  if (user.attributes.name.length <= 2) {
    throw new CustomError(
      "Name length must be greater than 2 characters!",
      400
    );
  }
});

export async function createUserInstance({ name, email, password, role }) {
  return await UsersModel.create({ name, email, password, role });
}
