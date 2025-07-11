import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import { User } from "../models/index.js";
import HttpError from "../helpers/HttpError.js";

const { JWT_SECRET } = process.env;

// 🔐 Реєстрація
export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new HttpError(409, "Email in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const avatarURL = gravatar.url(email, { s: "250" }, true);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      avatarURL,
    });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

// 🔑 Логін
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) throw new HttpError(401, "Email or password is wrong");

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new HttpError(401, "Email or password is wrong");

    const payload = { id: user.id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });

    user.token = token;
    await user.save();

    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

// 👤 Поточний користувач
export const getCurrentUser = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    res.status(200).json({ email, subscription });
  } catch (error) {
    next(error);
  }
};

// 🚪 Логаут
export const logout = async (req, res, next) => {
  try {
    req.user.token = null;
    await req.user.save();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// 🔁 Оновлення підписки
export const updateSubscription = async (req, res, next) => {
  try {
    const { subscription } = req.body;

    req.user.subscription = subscription;
    await req.user.save();

    res.status(200).json({
      email: req.user.email,
      subscription: req.user.subscription,
    });
  } catch (error) {
    next(error);
  }
};
