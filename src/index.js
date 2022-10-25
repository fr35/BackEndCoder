import express from "express"
import { create } from 'express-handlebars'
import { Server as HttpServer } from "http"
import { Server as IOServer } from "socket.io"
import { MessagesDao, ProductsDao } from "./Dao/index.js"
import { DATE_UTILS } from "./utils/index.js"

const PORT = 8080 
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const hbs = create({extname: ".hbs", defaultLayout: "main.hbs"})
app.engine('.hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', './views')

io.on('connection', async (socket) => {
    console.log(`nuevo cliente ${socket.id}`)
    //socket products
    socket.emit('allProducts', await ProductsDao.getAll())
    socket.on('addProduct', async (data) => {
        const products = await ProductsDao.save(data)
        io.sockets.emit('allProducts', await ProductsDao.getAll())
    })
    //socket messages
    socket.emit('messages', await MessagesDao.getAll())
    socket.on('newMessage', async ({email, text}) => {
        const message = {email, text, timestamp: DATE_UTILS.getTimestamp()}
        await MessagesDao.save(message)
        io.sockets.emit('messages', await MessagesDao.getAll())
    })
})

//app.use("/", indexRouter)
//app.use('/api/products', productsApiRouter)
//app.use('/products', productsRouter)

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`)
})
server.on("error", (error) => {
    console.error(`Error en el servidor ${error}`)
})
