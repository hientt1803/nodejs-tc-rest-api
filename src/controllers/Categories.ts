import express from "express";

import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategoryById,
  deleteCategoryById,
} from "../db/Categories";

export const getAllCategories = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const categories = await getCategories();

    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json("get error");
  }
};

export const create = async (req: express.Request, res: express.Response) => {
  try {
    const { categoryName } = req.body;

    if (!categoryName) res.status(400).json("please provide categoryName");

    const category = createCategory({
      categoryName,
      status: true,
    });

    return res.status(201).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json("create error");
  }
};

export const update = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { categoryName } = req.body;

    if (!categoryName) res.status(400).json("please provide categoryName");

    const category = await getCategoryById(id);

    !category && res.status(204).json("No category have been founded");

    category.categoryName = categoryName;
    category.update_at = new Date();
    
    category.save();

    return res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json("update error");
  }
};

export const deleteCategory = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteCategoryById(id);

    return res.status(204).json(deletedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
