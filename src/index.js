import express from "express"
import productRouter from "./routers/productRouter.js"

const PORT = 8080
const app = express()
app.use(express.json());

app.use('/api/products', productRouter)

app.listen(PORT, () =>
    console.log("Running on port " + PORT)
)
