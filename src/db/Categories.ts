import mongoose, { Schema, Document } from "mongoose";

// interface ICategory extends Document {
//   categoryName: string;
//   status: boolean;
//   products: IProduct[];
// }

// interface IProduct extends Document {
//   product_name: string;
//   image: string;
//   price: number;
//   quantity: number;
//   notes: string;
//   status: boolean;
//   category: mongoose.Types.ObjectId;
// }

const CategorySchema = new mongoose.Schema(
  {
    categoryName: { type: String, required: true },
    status: { type: Boolean, required: true, default: true },
    products: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

// CategorySchema.virtual("products", {
//   ref: "Product",
//   localField: "productsId",
//   foreignField: "category",
//   justOne: true,
// });

export const CategoryModel = mongoose.model("Category", CategorySchema);

export const getCategories = () =>
  CategoryModel.find().populate("products").exec();

export const getCategoryById = (id: String) => CategoryModel.findById(id);

export const createCategory = (values: Record<string, any>) =>
  new CategoryModel(values).save().then((category) => category.toObject());

export const updateCategoryById = (id: String, values: Record<string, any>) =>
  CategoryModel.findOneAndUpdate(id, values);

export const deleteCategoryById = (id: String) =>
  CategoryModel.findOneAndDelete({ _id: id });
