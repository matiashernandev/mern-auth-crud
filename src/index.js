import app from "./app.js"
import { config } from "dotenv"
import { connectDB } from "./db.js"

config()
connectDB()

const PORT = process.env.PORT

app.listen(PORT || 3000)

console.log(`Server on port ${PORT} `)
