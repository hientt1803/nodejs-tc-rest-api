import express from "express";
import { get, merge } from "lodash";

import { getUserBySessionToken } from "../db/User";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["TRANHIEN-AUTH"];

    if (!sessionToken) {
      return res.status(403).json("wrong credential");
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.status(404).json("user not found");
    }

    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "identity._id") as string;

    if (!currentUserId) {
      return res.status(404).json("not login");
    }

    if (currentUserId.toString() !== id) {
      return res.status(404).json("wrong credential, don't have permission");
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
