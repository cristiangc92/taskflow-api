import { Router } from "express";
import { getTaskByProject, createTask, updateTaskStatus, deleteTask } from "../controllers/task.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router()

router.get("/project/:projectId", authMiddleware, getTaskByProject)
router.post("/project/:projectId", authMiddleware, createTask)
router.put("/:taskId/status", authMiddleware, updateTaskStatus)
router.delete("/:id", authMiddleware, deleteTask)

export default router