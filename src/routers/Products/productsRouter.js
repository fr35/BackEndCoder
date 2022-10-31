import { Router } from "express"
import {ProductsDao} from "../../Dao/index.js"
import { verifyRole } from "../../middlewares/verifyRole.js"
import { DATE_UTILS, JOI_VALIDATOR} from "../../utils/index.js"

const productsRouter = Router()

productsRouter.get('/', async (req,res) => {
    const products = await ProductsDao.getAll()
    res.send(products)
})
productsRouter.get('/:id', async (req,res) => {
    const {id} = req.params
    const products = await ProductsDao.getById(id)
    res.send(products)
})
productsRouter.post('/new', verifyRole, async (req,res) => {
    try {
        const {title, description, code, price, stock, thumbnail} = req.body
    const product = await JOI_VALIDATOR.product.validateAsync({title, description, code, price, stock, thumbnail, timestamp: DATE_UTILS.getTimestamp()})
    const newProduct = await ProductsDao.save({product})
    res.send(newProduct)
    } catch (error){
        console.log(error);
    }
})
productsRouter.delete("/:id", async (req,res) => {
    try {
        const {id} = req.params
    await ProductsDao.deleteById(id)
    res.send({succes: true})
    } catch (error) {
        console.log(error)
    }
})

export {productsRouter}