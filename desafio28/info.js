import { Router } from "express"
import minimist from 'minimist'

const router = Router()


const arg= minimist(process.argv)
const carpetaDeProyecto = (process.cwd());
const sistemaOperativo = process.platform
const versionNode = process.version
const rss = process.memoryUsage()
const proccesId = process.pid



router.get('/', (req,res) => {
    res.send({
        carpetaDeProyecto, 
        sistemaOperativo,
        versionNode,    
        rss,
        proccesId,
        arg
    })
})

export { router as InfoRouter }