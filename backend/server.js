const express = require("express")
const path = require("path")
const cors = require("cors")
require("dotenv").config()

const { Pool } = require("pg")
const app = express()
const port = process.env.PORT

const pool = new Pool({
    host: "localhost",
    port: "5432",
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})

const setup = async () => {await pool.query(`
    CREATE TABLE IF NOT EXISTS applications (
        id SERIAL PRIMARY KEY,
        company TEXT NOT NULL,
        source TEXT NOT NULL,
        season TEXT NOT NULL,
        date TEXT NOT NULL
    )
    `)}

setup()

app.use(cors())
app.use(express.static(path.join(__dirname, "../frontend")))
app.use(express.json())

app.post("/api/applications", async (req, res) => {
    const {company, source, season, date} =  req.body
    try {
        const result = await pool.query(
            "INSERT INTO applications (company, source, season, date) VALUES ($1, $2, $3, $4) RETURNING *",
            [company, source, season, date]
        )   

        res.json(result.rows[0])

    } catch(e) {
        console.error(e)
    }
})

app.get("/api/applications", async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * from applications ORDER BY id'
        )
        res.json(result.rows)
        console.log(result.rows)
    } catch(e) {
        console.error(e)
    }
})

app.listen(port,  () => {
    console.log(`App listening on port ${port}`)
})