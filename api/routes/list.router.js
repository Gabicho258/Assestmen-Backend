import express from "express";

import { listController } from "../controllers/index.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const { createList, deleteList, getListsByUser, getListById } = listController;

const router = express.Router();

const userRoutes = {
  CREATE: "/list/create",
  GET_LISTS_BY_USER: "/list/user/:id",
  GET_LIST_BY_ID: "/list/:id",
  DELETE: "/list/delete/:id",
};

router.get(userRoutes.GET_LISTS_BY_USER, isAuthenticated, getListsByUser);
router.get(userRoutes.GET_LIST_BY_ID, isAuthenticated, getListById);
router.post(userRoutes.CREATE, isAuthenticated, createList);
router.delete(userRoutes.DELETE, isAuthenticated, deleteList);

export default router;
