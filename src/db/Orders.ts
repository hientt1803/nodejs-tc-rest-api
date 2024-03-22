import mongoose, { Schema } from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    totalPrice: { type: Number, required: true },
    status: { type: Boolean, require: true, default: true },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
    },
    orderDetails: [
      {
        type: Schema.Types.ObjectId,
        ref: "OrderDetail",
      },
    ],
  },
  { timestamps: true }
);

export const OrderModel = mongoose.model("Order", OrderSchema);

export const getAll = () =>
  OrderModel.find()
    .populate({
      path: "customer",
      select: "-orders",
    })
    .populate("orderDetails")
    .lean();

export const getById = (id: string) => OrderModel.findById(id);

export const create = (values: Record<string, any>) =>
  new OrderModel(values).save().then((order) => order.toObject());

const OrderDetailSchema = new mongoose.Schema(
  {
    price: { type: Number, require: true },
    quantity: { type: Number, require: true },
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

export const OrderDetailModel = mongoose.model(
  "OrderDetail",
  OrderDetailSchema
);

export const getAllOrderDetail = () =>
  OrderDetailModel.find().populate(["order", "products"]);

export const getOrderDetailById = (id: string) => OrderDetailModel.findById(id);

export const createOrderDetail = (values: Record<string, any>) =>
  new OrderDetailModel(values).save().then((order) => order.toObject());

export const deleteOrderDetail = (id: string) =>
  OrderDetailModel.findByIdAndDelete({ _id: id });
