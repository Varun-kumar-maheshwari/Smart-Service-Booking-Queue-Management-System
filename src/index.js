import app from "./app.js"
import dotenv from "dotenv"
import connectDB from "./config/db.config.js"
import userRoutes from "./routes/service.routes.js"
import serviceRouter from "./routes/service.routes.js"

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

    app.use("/api/v1/services", serviceRouter)