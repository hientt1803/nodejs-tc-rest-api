import mongoose from "mongoose";
import { Schema } from "mongoose";

// interface ICustomer {
//   email: string;
//   password: string;
//   customer_name: string;
//   gender: boolean;
//   address: string;
//   image: string;
//   status: boolean;
//   orders: IOrder[];
// }

// interface IOrder {
//   status: boolean;
//   customer: Schema.Types.ObjectId;
//   orderDetails: [];
// }

const CustomerSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    customer_name: { type: String, required: true },
    gender: { type: Boolean, required: false, default: true },
    address: { type: String, required: false },
    image: { type: String, required: false },
    status: { type: Boolean, require: true },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  { timestamps: true }
);

export const CustomerModel = mongoose.model("Customer", CustomerSchema);

export const getAll = () => CustomerModel.find();

export const getById = (id: string) => CustomerModel.findById(id);

export const getByEmail = (email: string) => CustomerModel.findOne({ email });

export const create = (values: Record<string, any>) =>
  new CustomerModel(values).save().then((customer) => customer.toObject());

export const deleteCustomer = (id: string) =>
  CustomerModel.findOneAndDelete({ _id: id });
