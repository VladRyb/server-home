import { urlencoded, json } from "express";
import morgan from "morgan";
// import dbConnection from "./db-connect.js";
import mongoose from "mongoose";

export default function (app) {
  mongoose
    .connect(
      `mongodb+srv://admin:${process.env.PASSWORD}@cluster0.qovlf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, //@cluster0.qovlf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .catch((err) => console.log(err));
  mongoose.set("useNewUrlParser", true);
  mongoose.set("useFindAndModify", false);
  mongoose.set("useCreateIndex", true);
  app.use(morgan("dev"));

  // Body POST запросов.
  app.use(urlencoded({ extended: true }));
  app.use(json());
}
