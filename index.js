const express = require('express')
const {create} = require('express-handlebars')

const  indexRoutes = require('./routes/index')
const  productsRoutes  = require('./routes/products')
const  errorRouter  = require('./routes/error')

const app = express()
const port = 8080

const hbs = create ({
    extname: ".hbs",
    helpers: {
    }
})

app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')
app.set('views', __dirname + '/views')

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use("/", indexRoutes)
app.use("/error", errorRouter)
app.use("/products", productsRoutes)

app.listen(port, () => {
    console.log(`Server listeting on port ${port}`)
})