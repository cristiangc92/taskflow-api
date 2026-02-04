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