import express from "express"
import { create } from 'express-handlebars'
import { Server as HttpServer } from "http"
import { Server as IOServer } from "socket.io"
import { addProduct, createTable, selectAll } from "./mariaDb/index.js"
import {productsRouter, cartRouter} from "./routers/index.js"
import { addMessage, getAllMessages } from "./sqlite3/index.js"


const PORT = 8080 
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use("/api/products", productsRouter)
app.use("/cart", cartRouter)

const hbs = create({extname: ".hbs", defaultLayout: "main.hbs"})
app.engine('.hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', './views')

io.on('connection', async (socket) => {
    console.log(`nuevo cliente ${socket.id}`)
    //socket products
    socket.emit('allProducts', selectAll())
    socket.on('addProduct', async ({title, description, code, price, stock, thumbnail}) => {
        const products = {title, description, code, price, stock, thumbnail}
        addProduct(products)
        io.sockets.emit('allProducts', selectAll())
    })
    //socket messages
    socket.emit('messages', getAllMessages())
    socket.on('newMessage', async ({email, message}) => {
        const message = {email, message}
        addMessage(message)
        io.sockets.emit('messages', getAllMessages())
})
})

app.use("/", indexRouter)
app.use('/api/products', productsApiRouter)
app.use('/products', productsRouter)

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`)
})
server.on("error", (error) => {
    console.error(`Error en el servidor ${error}`)
})
