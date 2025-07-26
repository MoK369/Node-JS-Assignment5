// @ts-check
import { Router } from "express";
import * as userService from "./user.service.js";

const userRouter = Router();

userRouter.post('/signup',userService.signup)
userRouter.put('/:id',userService.updateOrCreateUser)
userRouter.get('/by-email',userService.findUserByEmail)
userRouter.get('/:id',userService.getUserByPK)


export default userRouter;