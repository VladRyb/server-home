import { Router } from "express";
import { tokenChecker } from "../middleware/auth.js";
import Period from "../models/period.js";
import Price from "../models/price.js";

const saltRounds = 10;
const router = Router();

router.route("/data").get(tokenChecker, async (req, res, next) => {
  try {
    const price = await Price.findOne();
    const period = await Period.find();

    period.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.status(200).json({ price, period });
  } catch (error) {
    next(error);
  }
});

router.route("/new_period").post(tokenChecker, async (req, res, next) => {
  try {
    if (
      req.body.date.trim() === "" &&
      req.body.hot.trim() === "" &&
      req.body.cold.trim() === "" &&
      req.body.electricity.trim() === ""
    ) {
      res.status(400).json({ message: "Не все поля заполнены" });
    }

    const newPeriod = new Period({
      date: req.body.date,
      hot: req.body.hot,
      cold: req.body.cold,
      drainage: Number(req.body.hot) + Number(req.body.cold),
      electricity: req.body.electricity,
    });

    await newPeriod.save();
    const period = await Period.find();

    period.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.status(200).json({ period });
  } catch (error) {
    next(error);
  }
});

router
  .route("/period/:id")
  .delete(tokenChecker, async (req, res, next) => {
    const id = req.params.id;
    try {
      await Period.findByIdAndDelete(id);
      const period = await Period.find();

      period.sort((a, b) => new Date(b.date) - new Date(a.date));

      res.status(200).json({ period });
    } catch (error) {
      next(error);
    }
  })
  .patch(tokenChecker, async (req, res, next) => {
    const id = req.params.id;
    try {
      await Period.findByIdAndUpdate(id, {
        date: req.body.date,
        hot: req.body.hot,
        cold: req.body.cold,
        drainage: Number(req.body.hot) + Number(req.body.cold),
        electricity: req.body.electricity,
      });
      const period = await Period.find();

      period.sort((a, b) => new Date(b.date) - new Date(a.date));

      res.status(200).json({ period });
    } catch (error) {
      res.status(400);
    }
  });

export default router;
