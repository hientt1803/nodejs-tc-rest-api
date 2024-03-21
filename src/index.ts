import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookiParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import router from "./routes";
import connection from "./helpers/connection";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookiParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
  console.log("Server running on localhost: 8080");
  connection();
});

app.use("/", router());
