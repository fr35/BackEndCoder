import { Router } from "express"
import compression from "compression";
import {cpus} from 'os'

const router = Router()

const numCPUs = cpus().length

const info = {
    argumentosDeEntrada: process.argv.slice(2),
    nombreDeSistemaOperativo: process.platform,
    vercionDeNode: process.version,
    memoriaTotalReservada: process.memoryUsage(),
    pathDeEjecucion: process.execPath,
    processID: process.pid,
    carpetaDeProyecto: process.cwd(),
    cantidadDeCpus: numCPUs
}

router.get('/', (req,res) => {
    try {
        logger.info(`${info}`)
        es.send({info})
    } catch (error) {
        logger.error('eror')
        res.send('error')
    }
})
// La cantidad de bytes fue 

router.get('/zip', compression(), (req,res) => {
    console.log("Ruta info/zip", info);
    res.send({info})
})
// La cantidad de bytes fue 

export { router as InfoRouter }