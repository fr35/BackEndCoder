import { Router } from "express"
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
    res.send({info})
})

export { router as InfoRouter }