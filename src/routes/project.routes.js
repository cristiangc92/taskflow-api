import { Router } from "express";
import { getProjects, createProject } from "../controllers/project.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router()

router.get("/", authMiddleware, getProjects)
router.post("/", authMiddleware, createProject)

export default router