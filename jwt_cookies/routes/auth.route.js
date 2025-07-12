import express from "express";
import { signup, login, refresh, logout } from "../controllers/auth.controller.js";
import { validateSignup, validateLogin } from "../middleware/validation.middleware.js";

const router = express.Router();

router.post("/signup", validateSignup, signup);
router.post("/login", validateLogin, login);
router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;
