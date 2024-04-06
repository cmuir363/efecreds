import 'dotenv/config'
import fs from 'fs'

export const clientConfig = {
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: parseInt(process.env.PG_PORT),
    ssl: {
        rejectUnauthorized: false,
        ca: fs.readFileSync(`${process.env.PATH_TO_CERTS}/certs/ca.cert`).toString()
    }
}

