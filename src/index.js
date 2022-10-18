import express from "express"
import productsApiRouter from "./routers/productsApiRouter.js"
import { create } from 'express-handlebars'
import productsRouter from "./routers/productsRouter.js"
import indexRouter from "./routers/index.js"


const PORT = 8080
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const hbs = create({extname: ".hbs",})
app.engine('.hbs', hbs.engine)
//app.set('view engine', 'hbs')
app.set('view engine', 'ejs')
//app.set('view engine', 'pug')
app.set('views', './views')
app.use(express.static('public'))

app.use("/", indexRouter)
app.use('/api/products', productsApiRouter)
app.use('/products', productsRouter)

app.listen(PORT, () =>
    console.log("Running on port " + PORT)
)
