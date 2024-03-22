import express from "express";

import { getAllOrders, createOrder, updateOrder } from "../controllers/Orders";
import { isAuthenticated } from "../middlewares";

export default (router: express.Router) => {
  router.get("/api/orders", isAuthenticated, getAllOrders);
  router.post("/api/orders", isAuthenticated, createOrder);
  router.patch("/api/orders/:id", isAuthenticated, updateOrder);
};
