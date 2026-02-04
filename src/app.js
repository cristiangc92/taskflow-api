import express from "express"
import cors from "cors"
import userRoutes from "./routes/user.routes.js"
import authRoutes from "./routes/auth.routes.js"
import projectRoutes from "./routes/project.routes.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/projects", projectRoutes)

export default app