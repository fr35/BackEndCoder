import express from "express"
import {RandomsRouter} from './random.js'
import {InfoRouter} from './info.js'

const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))


app.use('/info', InfoRouter)
app.use("/api/randoms", RandomsRouter)

const server = app.listen(8080, () =>
    console.log(`Server running on port ${server.address().port}`)
)

