import express from "express";

import {
  getAllProducts,
  create,
  update,
  deleteSingleProduct,
} from "../controllers/Products";
import { isAuthenticated } from "../middlewares";
import { upload } from "../helpers/upload";

export default (route: express.Router) => {
  route.get("/api/products", isAuthenticated, getAllProducts);
  route.post("/api/products", isAuthenticated, upload.single("image"), create);
  route.patch(
    "/api/products/:id",
    isAuthenticated,
    upload.single("image"),
    update
  );
  route.delete("/api/products/:id", isAuthenticated, deleteSingleProduct);
};
