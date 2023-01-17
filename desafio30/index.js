import express from "express"
import {InfoRouter} from './info.js'
import cluster from 'cluster'
import {cpus}  from "os"

const PORT = parseInt(process.argv[2]) || 8080
const modoCluster = process.argv[3] == 'CLUSTER'
const numCPUs = cpus().length

if (modoCluster && cluster.isPrimary) {
    console.log(`Número de procesadores: ${numCPUs}`)
    console.log(`PID MASTER ${process.pid}`)
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }
    cluster.on('exit', worker => {
        console.log('Worker', worker.process.pid, 'died')
        cluster.fork()
    })
} else {
        const app = express()
        app.get('*', (req, res) => {
            const { url, method } = req
            logger.warn(`Ruta ${method} ${url} no implementada`)
            res.send(`Ruta ${method} ${url} no está implementada`)
        })
        app.use('/info', InfoRouter)
        app.listen(PORT, err => {
            if (!err) console.log(`Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`)
        }
    )
}

