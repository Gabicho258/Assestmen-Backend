import express from "express";

import { listController } from "../controllers/index.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const {
  createList,
  deleteList,
  getListsByUser,
  getListById,
  addFavToList,
  deleteFavFromList,
} = listController;

const router = express.Router();

const listRoutes = {
  CREATE: "/list/create",
  ADD_FAV_TO_LIST: "/fav/add/:id",
  DELETE_FAV_FROM_LIST: "/fav/delete/:id",
  GET_LISTS_BY_USER: "/list/user/:id",
  GET_LIST_BY_ID: "/list/:id",
  DELETE: "/list/delete/:id",
};

router.get(listRoutes.GET_LISTS_BY_USER, isAuthenticated, getListsByUser);
router.get(listRoutes.GET_LIST_BY_ID, isAuthenticated, getListById);
router.post(listRoutes.CREATE, isAuthenticated, createList);
router.post(listRoutes.ADD_FAV_TO_LIST, isAuthenticated, addFavToList);
router.delete(listRoutes.DELETE, isAuthenticated, deleteList);
router.delete(
  listRoutes.DELETE_FAV_FROM_LIST,
  isAuthenticated,
  deleteFavFromList
);

export default router;
