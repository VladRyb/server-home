import { Router } from "express";
import bcrypt, { compare } from "bcrypt";
import User from "../models/user.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { tokenChecker } from "../middleware/auth.js";
dotenv.config();

const saltRounds = 10;
const router = Router();

router.route("/signup").post(async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const checkUser = await User.findOne({ username });

    if (checkUser) {
      res.status(400).json({ message: "Такой пользователь уже существует" });
    }

    const user = new User({
      username,
      password: await bcrypt.hash(password, saltRounds),
    });
    await user.save();
    const jwtToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });

    res.status(200).json({ token: jwtToken });
  } catch (error) {
    next(error);
  }
});

router.route("/login").post(async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user && (await compare(password, user.password))) {
      const jwtToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "24h",
      });
      res.status(200).json({
        token: jwtToken,
        user: { login: user.username, id: user._id },
      });
    } else {
      res.status(400).json({ message: "Неправильный логин или пароль" });
    }
  } catch (error) {
    next(error);
  }
});

router.route("/auth").get(tokenChecker, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    res.status(200).json({
      user: { login: user.username, id: user._id },
    });
  } catch (error) {
    res.status(401).json({ message: "Пользователь не авторизован" });
  }
});

export default router;
