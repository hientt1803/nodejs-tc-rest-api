import express from "express";
import {
  getAllOrderDetail,
  createOrderDetail,
  deleteOrderDetail,
} from "../db/Orders";

export const getAll = async (req: express.Request, res: express.Response) => {
  try {
    const orderDetails = await getAllOrderDetail();

    res.status(200).json(orderDetails);
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const store = async (req: express.Request, res: express.Response) => {
  try {
    const { price, quantity, order_id, product_id } = req.body;

    if (!price || !quantity || !order_id || !product_id) {
      res.status(400).json("please provide orderDetail data");
    }

    const orderDetail = createOrderDetail({
      price,
      quantity,
      order: order_id,
      product: product_id,
    });

    return res.status(201).json(orderDetail);
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const destroy = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    const orderDetail = deleteOrderDetail(id);

    return res.status(204).json("message: orderDetail have been deleted");
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
