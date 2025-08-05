import express from "express";
import { addHandler } from "../controllers/math.controller.js";

const router = express.Router();

router.post("/add", addHandler);

export default router;
