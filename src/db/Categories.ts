import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    categoryName: { type: String, required: true },
    status: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

export const CategoryModel = mongoose.model("Category", CategorySchema);

export const getCategories = () => CategoryModel.find();

export const getCategoryById = (id: String) => CategoryModel.findById(id);

export const createCategory = (values: Record<string, any>) =>
  new CategoryModel(values).save().then((category) => category.toObject());

export const updateCategoryById = (id: String, values: Record<string, any>) =>
  CategoryModel.findOneAndUpdate(id, values);

export const deleteCategoryById = (id: String) =>
  CategoryModel.findOneAndDelete({ _id: id });
