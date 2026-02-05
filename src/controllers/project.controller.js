import pool from "../config/db.js"

export const getProjects = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM projects WHERE user_id = $1 ORDER BY created_at DESC',
            [req.user.id]
        )
        res.json(result.rows)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al obtener proyectos' })
    }
}

export const createProject = async (req, res) => {
    const { name, description } = req.body

    try {
        const result = await pool.query(
            "INSERT INTO projects (name, description, user_id) VALUES ($1, $2, $3) RETURNING *",
            [name, description, req.user.id]
        )
        res.status(201).json(result.rows[0])
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Error al crear proyecto" })        
    }
}

export const getProjectsById = async (req, res) => {
    const { id } = req.params
    const userId = req.user.id

    try {
        const projectResult = await pool.query(
            "SELECT * FROM projects WHERE id = $1 AND user_id = $2",
            [id, userId]
        )

        if(projectResult.rows.length === 0){
            return res.status(404).json({ error: "Proyecto no encontrado" })
        }

        const tasksResult = await pool.query(
            "SELECT * FROM tasks WHERE project_id = $1 ORDER BY created_at ASC",
            [id]
        )

        res.json({
            ...projectResult.rows[0],
            tasks: tasksResult.rows
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Error al obtener el proyecto" })
    }
}

export const deleteProject = async (req, res) => {
  const { id } = req.params
  const userId = req.user.id

  try {
    const tasks = await pool.query(
      "SELECT id FROM tasks WHERE project_id = $1",
      [id]
    )

    if (tasks.rows.length > 0) {
      return res.status(400).json({
        error: "No se puede eliminar un proyecto con tareas"
      })
    }

    const result = await pool.query(
      "DELETE FROM projects WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, userId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Proyecto no encontrado" })
    }

    res.json({ message: "Proyecto eliminado" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error al eliminar proyecto" })
  }
}
