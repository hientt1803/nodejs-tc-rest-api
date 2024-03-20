import express from "express";

import {
  getAllCategories,
  create,
  update,
  deleteCategory,
} from "../controllers/Categories";
import { isAuthenticated, isOwner } from "../middlewares";

export default (router: express.Router) => {
  router.get("/api/categories", isAuthenticated, getAllCategories);
  router.post("/api/categories", isAuthenticated, create);
  router.patch("/api/categories/:id", isAuthenticated, update);
  router.delete("/api/categories/:id", isAuthenticated, deleteCategory);
};
