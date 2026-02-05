import express from "express"
import cors from "cors"
import userRoutes from "./routes/user.routes.js"
import authRoutes from "./routes/auth.routes.js"
import projectRoutes from "./routes/project.routes.js"
import taskRoutes from "./routes/task.routes.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/projects", projectRoutes)
app.use("/api/tasks", taskRoutes)

export default app