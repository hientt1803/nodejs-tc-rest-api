import express from "express";
import fs from "fs";
import { getAll, createProduct, getById, deleteProduct } from "../db/Products";

export const getAllProducts = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const products = await getAll();

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const create = async (req: express.Request, res: express.Response) => {
  try {
    const { product_name, image, price, quantity, notes, category_id } =
      req.body;

    if (!req.body) res.status(400).json("please provide product data");

    const imagePath = req.file ? req.file.path : null;

    const pathParts = imagePath.split("\\");
    const startIndex = pathParts.indexOf("storage");
    const relativePathWithFileName = pathParts.slice(startIndex).join("\\");

    const product = createProduct({
      product_name,
      image: relativePathWithFileName,
      price,
      quantity,
      notes,
      category: category_id,
    });

    return res.status(201).json({ product });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const update = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { product_name, image, price, quantity, notes, category_id } =
      req.body;

    if (!req.body) res.status(400).json("please provide product data");

    const product = await getById(id);

    const imagePath = req.file ? req.file.path : null;

    const pathParts = imagePath.split("\\");
    const startIndex = pathParts.indexOf("storage");
    const relativePathWithFileName = pathParts.slice(startIndex).join("\\");

    !product && res.status(204).json("No product have been founded");

    product.product_name = product_name;
    if (imagePath !== null) {
      product.image = relativePathWithFileName;
    }
    product.price = price;
    product.quantity = quantity;
    product.notes = notes;
    product.category = category_id;

    product.save();

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteSingleProduct = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const product = await deleteProduct(id);

    return res.status(204).json(product);
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
