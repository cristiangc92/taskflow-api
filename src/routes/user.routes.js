import { Router } from "express";
import { getUsers } from "../controllers/user.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router()

router.get("/", authMiddleware, getUsers)

export default router