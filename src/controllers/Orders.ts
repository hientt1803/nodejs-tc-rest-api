import express from "express";
import { getAll, getById, create } from "../db/Orders";

export const getAllOrders = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const orders = await getAll();

    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const createOrder = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { totalPrice, customer_id } = req.body;

    if (!totalPrice || !customer_id) {
      res.status(400).json("please provide order detauk");
    }

    const order = create({
      totalPrice,
      customer: customer_id,
    });

    return res.status(201).json(order);
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateOrder = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { totalPrice, customer_id } = req.body;

    if (!totalPrice || !customer_id) {
      res.status(400).json("please provide order data");
    }
    const order = await getById(id);

    !order && res.status(204).json("No order have been founded");

    order.status = !order.status;

    order.save();

    return res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
