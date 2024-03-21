import express from "express";

import { createUser, getUserByEmail } from "../db/User";
import { authentication, random } from "../helpers";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json("wrong username or password!");
    }

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      return res.status(404).json("wrong user");
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password != expectedHash) {
      return res.status(400).json("wrong password");
    }

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();

    res.cookie("TRANHIEN-AUTH", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json("please, enter email, password, username");
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(400).json("user areadly exist");
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const logout = async (req: express.Request, res: express.Response) => {
  try {
    res.clearCookie("TRANHIEN-AUTH", {
      domain: "localhost",
      path: "/",
    });

    res.status(200).json("You have been lougged out successfully");
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
