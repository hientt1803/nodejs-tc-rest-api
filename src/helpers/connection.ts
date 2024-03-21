import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export default () => {
  const MONGO_URL = process.env.MONGO_URL;
  mongoose.Promise = Promise;
  mongoose.connect(MONGO_URL);
  mongoose.connection.on("error", (error: Error) => console.log(error));
};
