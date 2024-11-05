import pg from 'pg'
import './dotenv.js'

//the configuration variables from .env
const config = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE
}

//Create a connection pool so we can make frequent queries to the Postgres database.
export const pool = new pg.Pool(config)
