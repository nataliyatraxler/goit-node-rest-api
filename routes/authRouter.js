import express from "express";
import { validateBody } from "../helpers/validateBody.js";
import { subscriptionSchema } from "../schemas/authSchemas.js"; 

import authenticate from "../middlewares/authenticate.js";
import { updateAvatar } from "../controllers/userControllers.js";
import { upload } from "../middlewares/upload.js";
import {
  register,
  login,
  logout,
  getCurrentUser,
  updateSubscription,
  verifyEmail,
  resendVerifyEmail,
} from "../controllers/authControllers.js";

import { registerSchema, loginSchema } from "../schemas/authSchemas.js";

const router = express.Router();


router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

// 🔐 Auth Routes
router.post("/register", register);
router.get("/verify/:verificationToken", verifyEmail);
router.post("/verify", resendVerifyEmail);
router.post("/login", login);

router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);
router.post("/register", validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchema), login);
router.get("/current", authenticate, getCurrentUser); 
router.post("/logout", authenticate, logout); 
router.patch(
    "/subscription",
    authenticate,
    validateBody(subscriptionSchema),
    updateSubscription
  );
export default router;
