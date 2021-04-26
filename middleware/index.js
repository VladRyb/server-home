import { urlencoded, json } from "express";
import morgan from "morgan";
// import dbConnection from "./db-connect.js";
import mongoose from "mongoose";

export default function (app) {
  mongoose.connect(
    `mongodb+srv://admin:${process.env.PASSWORD}@cluster0.qovlf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  app.use(morgan("dev"));

  // Body POST запросов.
  app.use(urlencoded({ extended: true }));
  app.use(json());
}
