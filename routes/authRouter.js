import express from "express";
import { register, login, getCurrentUser, logout } from "../controllers/authControllers.js";
import { validateBody } from "../helpers/validateBody.js";
import { subscriptionSchema } from "../schemas/authSchemas.js"; // або з іншого файла
import { updateSubscription } from "../controllers/authControllers.js";
import authenticate from "../middlewares/authenticate.js";

import { registerSchema, loginSchema } from "../schemas/authSchemas.js";

const router = express.Router();

// 🔐 Auth Routes
router.post("/register", validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchema), login);
router.get("/current", authenticate, getCurrentUser); // ➕ додано
router.post("/logout", authenticate, logout); // ➕ (опціонально, але потрібно для ТЗ)
router.patch(
    "/subscription",
    authenticate,
    validateBody(subscriptionSchema),
    updateSubscription
  );
export default router;
