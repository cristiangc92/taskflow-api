import pkg from "pg"
const { Pool } = pkg

const isProduction = process.env.NODE_ENV === "production"

const pool = new Pool(
  isProduction
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
      }
    : {
        host: "localhost",
        user: "postgres",
        password: "159357",
        database: "taskflow_db",
        port: 5432
      }
)

export default pool
