import express from "express";
import {
  getEdit,
  postEdit,
  logout,
  see,
  startGithubLogin,
  finishGithubLogin,
} from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
// 로그인 되어있지 않으면 로그아웃페이지 또는 /users/edit 페이지로 올 수 없게 보호해주는 것!
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
// 로그인 되어있으면 깃헙로그인으로 올 수 없게 보호해주는 것!
userRouter.get(":id", see);

export default userRouter;
