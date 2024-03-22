import express from "express";

import { getAll, store, destroy } from "../controllers/OrderDetail";
import { isAuthenticated } from "../middlewares";

export default (router: express.Router) => {
  router.get("/api/orders", isAuthenticated, getAll);
  router.post("/api/orders", isAuthenticated, store);
  router.delete("/api/orders/:id", isAuthenticated, destroy);
};
