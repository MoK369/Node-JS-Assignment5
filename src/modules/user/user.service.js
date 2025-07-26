// @ts-check
import { UsersModel } from "../../db/models/users.model.js";
import { CustomError } from "../../utils/custom_error.js";

export const signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const result = await UsersModel.create({ name, email, password, role });
    const { password: password2, ...restUser } = result.dataValues;
    return res.status(201).json({
      success: true,
      message: "User Created!",
      body: restUser,
    });
  } catch (error) {
    next(error);
  }
};
export const updateOrCreateUser = async (req, res, next) => {
  try {
    const { name, email, role } = req.body;
    const userId = req.params.id;
    const result = await UsersModel.upsert(
      {
        id: userId,
        name,
        email,
        password: "",
        role,
      },
      {
        validate: false,
      }
    );
    // @ts-ignore
    const { password: password2, ...restUser } = result[0].dataValues;
    return res.json({
      success: true,
      message: "User Updated or Created!",
      body: {
        user: restUser,
        created: result[1],
      },
    });
  } catch (error) {
    next(error);
  }
};
export const findUserByEmail = async (req, res, next) => {
  try {
    const { email } = req.query;
    if (!email) {
      throw new CustomError("Missing query argument 'email' ", 400);
    }
    const result = await UsersModel.findOne({
      where: { email: email },
      // @ts-ignore
      attributes: { exclude: "password" },
    });
    if (result == null) {
      throw new CustomError("User not found", 404);
    }

    return res.json({
      success: true,
      body: result,
    });
  } catch (error) {
    next(error);
  }
};
export const getUserByPK = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const result = await UsersModel.findByPk(userId, {
      attributes: { exclude: ["role", "password"] },
    });
    if (result == null) {
      throw new CustomError("User not found", 404);
    }
    return res.json({
      success: true,
      body: result,
    });
  } catch (error) {
    next(error);
  }
};
