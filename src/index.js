import app from "./app.js"
import dotenv from "dotenv"
import connectDB from "./config/db.config.js"
import User from "./models/user.model.js"

dotenv.config({
    path : "./.env"
})

const port = process.env.PORT || 8000

connectDB()
    .then(() => {
        app.listen(port, () => console.log(`Server is running  on ${port}`))
    })
    .catch((err) => {
        console.error("MongoDB connection error ",err)
        process.exit(1)
    })

    const user = User.create