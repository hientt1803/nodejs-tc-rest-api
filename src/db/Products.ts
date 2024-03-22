import mongoose, { Schema } from "mongoose";

// interface ICategory extends Document {
//   categoryName: string;
//   status: boolean;
//   products: mongoose.Types.ObjectId;
// }

// interface IProduct extends Document {
//   product_name: string;
//   image: string;
//   price: number;
//   quantity: number;
//   notes: string;
//   status: boolean;
//   category: ICategory;
// }

const ProductSchema = new mongoose.Schema(
  {
    product_name: { type: String, required: true },
    image: { type: String, required: false },
    price: { type: Number, required: true },
    quantity: { type: Number, requred: true },
    notes: { type: String, required: false },
    status: { type: Boolean, require: true, default: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model("Product", ProductSchema);

export const getAll = () =>
  ProductModel.find()
    .populate({
      path: "category",
      select: "-product",
    })
    .lean();

export const getById = (id: string) => ProductModel.findById(id);

export const createProduct = (values: Record<string, any>) =>
  new ProductModel(values).save().then((product) => product.toObject());

export const deleteProduct = (id: string) =>
  ProductModel.findOneAndDelete({ _id: id });
