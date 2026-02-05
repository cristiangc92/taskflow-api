import { Router } from "express";
import { getProjects, createProject, getProjectsById, deleteProject } from "../controllers/project.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router()

router.get("/", authMiddleware, getProjects)
router.post("/", authMiddleware, createProject)
router.get("/:id", authMiddleware, getProjectsById)
router.delete("/:id", authMiddleware, deleteProject)

export default router