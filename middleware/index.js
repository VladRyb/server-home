import { urlencoded, json } from "express";
import morgan from "morgan";
import dbConnection from "./db-connect.js";

export default function (app) {
  app.use(morgan("dev"));

  // Body POST запросов.
  app.use(urlencoded({ extended: true }));
  app.use(json());
}
