import pool from "../config/db.js"

export const getTaskByProject = async (req, res) => {
    const { projectId } = req.params

    try {
        const result = await pool.query(
            "SELECT * FROM tasks WHERE project_id = $1 AND user_id = $2 ORDER BY created_at DESC",
            [projectId, req.user.id]
        )

        return res.json(result.rows)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Error al obtener las tareas" })
    }
}

export const createTask = async (req, res) => {
  const { title, description } = req.body
  const { projectId } = req.params

  if (!title) {
    return res.status(400).json({ error: "El título es obligatorio" })
  }

  try {
    const result = await pool.query(
      `INSERT INTO tasks (title, description, project_id, user_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [title, description, projectId, req.user.id]
    )

    return res.status(201).json(result.rows[0])
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Error al crear tarea" })
  }
}

export const updateTaskStatus = async (req, res) => {
  const { taskId } = req.params
  const { status } = req.body

  const validStatus = ["todo", "doing", "done"]
  if (!validStatus.includes(status)) {
    return res.status(400).json({ error: "Estado inválido" })
  }

  try {
    const result = await pool.query(
      `UPDATE tasks 
       SET status = $1 
       WHERE id = $2 AND user_id = $3
       RETURNING *`,
      [status, taskId, req.user.id]
    )

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Tarea no encontrada" })
    }

    return res.json(result.rows[0])
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Error al actualizar tarea" })
  }
}