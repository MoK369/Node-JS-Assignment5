import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("assignment5_db", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

export async function testDbConnection() {
  let result = false;
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    result = true;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    result = false;
  }
  return result;
}