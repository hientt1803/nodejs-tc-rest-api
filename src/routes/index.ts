import express from "express";

import authentication from "./authentication";
import users from "./users";
import categories from "./categories";
import products from "./products";
import customers from "./customers";
import orders from "./orders";

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  categories(router);
  products(router);
  customers(router);
  orders(router);

  return router;
};
