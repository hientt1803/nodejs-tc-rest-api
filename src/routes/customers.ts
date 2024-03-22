import express from "express";

import {
  getAllCustomer,
  createCustomer,
  update,
  deleteSingleCustomer,
} from "../controllers/Customers";

import { isAuthenticated } from "../middlewares";
import { uploadCustomer } from "../helpers/upload";

export default (router: express.Router) => {
  router.get("/api/customers", isAuthenticated, getAllCustomer);
  router.post("/api/customers", isAuthenticated, createCustomer);
  router.patch(
    "/api/customers/:id",
    isAuthenticated,
    uploadCustomer.single("image"),
    update
  );
  router.delete("/api/customers/:id", isAuthenticated, deleteSingleCustomer);
};
