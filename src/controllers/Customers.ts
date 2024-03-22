import express from "express";

import {
  getAll,
  create,
  getById,
  getByEmail,
  deleteCustomer,
} from "../db/Customers";
import { authentication, random } from "../helpers";

export const getAllCustomer = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const customers = await getAll();

    res.status(200).json(customers);
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const createCustomer = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { customer_name, email, password } = req.body;

    if (!customer_name || !email || !password) {
      res.status(400).json("please provide customer data");
    }

    const existingCustomer = await getByEmail(email);

    if (existingCustomer) {
      res.status(400).json({ success: false, message: "Customer existing" });
    }

    const salt = random();

    const customer = create({
      customer_name,
      email,
      password: authentication(salt, password),
    });

    return res.status(201).json(customer);
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const update = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { customer_name, email, password, address, gender } = req.body;

    if (!req.body) res.status(400).json("please provide customer data");

    const customer = await getById(id);

    const imagePath = req.file ? req.file.path : null;

    const pathParts = imagePath.split("\\");
    const startIndex = pathParts.indexOf("storage");
    const relativePathWithFileName = pathParts.slice(startIndex).join("\\");

    !customer && res.status(204).json("No customer have been founded");

    customer.customer_name = customer_name;
    if (imagePath !== null) {
      customer.image = relativePathWithFileName;
    }
    customer.email = email;
    customer.gender = gender;
    customer.address = address;

    const salt = random();
    customer.password = authentication(salt, password);

    customer.save();

    return res.status(200).json(customer);
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteSingleCustomer = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const customer = await deleteCustomer(id);

    return res.status(204).json(customer);
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
