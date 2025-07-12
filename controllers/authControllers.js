
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import { User } from "../models/index.js";
import HttpError from "../helpers/HttpError.js";
import { resendEmailSchema } from "../schemas/userSchemas.js";
import { nanoid } from 'nanoid';
import { sendEmail} from "../helpers/sendEmail.js";



const { JWT_SECRET, BASE_URL } = process.env;


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
    const verificationToken = nanoid();

    const newUser = await User.create({
      email,
      password: hashedPassword,
      avatarURL,
      verificationToken,
      verify: false,
    });

    await sendEmail({
      to: email,
      subject: "Verify your email",
      html: `<a href="${BASE_URL}/api/auth/verify/${verificationToken}">Click to verify your email</a>`,
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

    if (!user.verify) {
      throw new HttpError(401, "Email not verified");
    }

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

// ✅ Підтвердження email
export const verifyEmail = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;

    const user = await User.findOne({ where: { verificationToken } });
    if (!user) {
      throw new HttpError(404, "User not found");
    }

    user.verify = true;
    user.verificationToken = null;
    await user.save();

    res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    next(error);
  }
};

// 🔁 Повторне надсилання листа
export const resendVerifyEmail = async (req, res, next) => {
  try {
    const { error } = resendEmailSchema.validate(req.body);
    if (error) {
      throw new HttpError(400, error.message);
    }

    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new HttpError(404, "User not found");
    }

    if (user.verify) {
      throw new HttpError(400, "Verification has already been passed");
    }

    await sendEmail({
      to: email,
      subject: "Verify your email",
      html: `<a href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click to verify your email</a>`,
    });

    res.status(200).json({ message: "Verification email sent" });
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

// 🧾 Оновлення підписки
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