import express from "express";

import { userController } from "../controllers/index.js";

const { login, registerUser } = userController;

const router = express.Router();

const userRoutes = {
  LOGIN: "/local/login",
  REGISTER: "/local/register",
};

router.post(userRoutes.LOGIN, login);
router.post(userRoutes.REGISTER, registerUser);

export default router;
