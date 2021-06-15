import express from "express";
import { join, dirname } from "path";
import useMiddleware from "./middleware/index.js";
import indexRouter from "./routes/index.js";
import priceRoute from "./routes/price.js";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import cors from "cors";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
useMiddleware(app);

app.use(express.static(join(__dirname, "public")));

app.use(cookieParser());

app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://home-rent4.web.app");
  //    "https://home-rent4.web.app"

  // authorized headers for preflight requests
  // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();

  app.options("*", (req, res) => {
    res.header(
      "Access-Control-Allow-Methods",
      "GET, PATCH, PUT, POST, DELETE, OPTIONS"
    );
    res.send();
  });
});

// Подключаем импортированные маршруты с определенным url префиксом.
//
//
//
//
app.use("/api", indexRouter);
app.use("/api", priceRoute);

export default app;
