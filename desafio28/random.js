import { Router } from "express"
import {fork} from 'child_process'
const router = Router()



router.get('/', (req,res) => {
    const child= fork('./child.js')
    child.on('num', num => {
        try {
            console.log(num);
            const query = req.query
            //Pasar el query a number
            const queryData = Object.keys(query)
            const queryNumber = Number(queryData[0])
            let objetoDeNumeros = {}
            console.log(isNan(queryNumber));
            if(isNaN(queryNumber)) {
                for (let i = 0; i < 100000000; i++) {
                    const num = num;
                    if (!objetoDeNumeros[num]) objetoDeNumeros[num] = 0;
                    objetoDeNumeros[num]++;
                }
            } else {
                for (let i = 0; i < queryNumber; i++) {
                    if (!objetoDeNumeros[num]) objetoDeNumeros[num] = 0;
                    objetoDeNumeros[num]++;
                }
            }
            console.log(objetoDeNumeros);
            res.send({objetoDeNumeros})
        } catch (error) {
            console.log(error);
        }
    })
})





export { router as RandomsRouter }