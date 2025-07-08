import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import HttpError from "../helpers/HttpError.js";

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";

    const [bearer, token] = authHeader.split(" ");

    if (bearer !== "Bearer" || !token) {
      throw new HttpError(401, "Not authorized");
    }

    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new HttpError(401, "Not authorized");
    }

    const user = await User.findByPk(payload.id);

    if (!user || user.token !== token) {
      throw new HttpError(401, "Not authorized");
    }

    req.user = user; // передаємо користувача далі
    next();
  } catch (error) {
    next(error);
  }
};

export default authenticate;
