// @ts-check
<<<<<<< HEAD
import { syncAllModels, testDbConnection } from "./db/db.connection.js";
import express from "express";
import userRouter from "./modules/user/user.controller.js";
import postRouter from "./modules/post/post.controller.js";
import applyAssociations from "./db/association/models.association.js";
import commentRouter from "./modules/comment/comment.controller.js";

async function bootstrap() {
  // Testing Database Connection
  const testConnectionResult = await testDbConnection();
  if (testConnectionResult) {
    // Sync All Model to Database
    applyAssociations();
    const synceModelsResult = await syncAllModels();
    if (!synceModelsResult) return;
=======
import express from "express";

async function bootstrap() {
  // Testing Database Connection
  const result = true;
  if (result) {
    // Sync All Model to Database
>>>>>>> orgin/master

    const app = express();
    const port = 3000;

    app.use(express.json());
    // APIs Routes
<<<<<<< HEAD
    app.use("/user", userRouter);
    app.use("/post", postRouter);
    app.use("/comments", commentRouter);
=======

>>>>>>> orgin/master
    app.all("{/*d}", (req, res, next) => {
      return res
        .status(400)
        .json({ error: `Wrong URL ${req.url} or MOTHED ${req.method}` });
    });

    // start server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    // Error Handling
    app.use((error, req, res, next) => {
      console.error({ error });
      console.error({ name: error.name });
      console.log({ message: error.message });

      if (error.message.includes("Cannot destructure property")) {
        return res
          .status(400)
          .json({ success: false, error: "Missing Body Data" });
      }
      if (
        error.name.includes("SequelizeValidationError") ||
        error.name.includes("SyntaxError") ||
        error.name.includes("SequelizeDatabaseError")
      ) {
        return res.status(400).json({ success: false, error: error.message });
      }
      if (error.name.includes("SequelizeUniqueConstraintError")) {
        return res
          .status(400)
          .json({ success: false, error: error.errors[0].message });
      }
      if (error.name.includes("SequelizeForeignKeyConstraintError")) {
        return res
          .status(400)
          .json({ success: false, error: "userId is not found" });
      }
      if (error.name.includes("CustomError")) {
        return res
          .status(error.statusCode)
          .json({ success: false, error: error.message });
      }
      if (error.name.includes("AggregateError")) {
        let errorMessage = "";
        for (error of error.errors) {
          errorMessage += error.message;
        }
        return res.status(400).json({ success: false, error: errorMessage });
      }
      return res.status(500).json({ success: false, error: error.message });
    });
  }
}

export default bootstrap;
