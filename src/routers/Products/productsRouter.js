import { Router } from "express"
import {CartDao, ProductsDao} from "../../Dao/index.js"
import { verifyRole } from "../../middlewares/verifyRole.js"
import {DATE_UTILS, JOI_VALIDATOR, ERRORS_UTILS} from "../../utils/index.js"

const productsRouter = Router()

productsRouter.get('/', async (req,res) => {
    try {
        const products = await ProductsDao.getAll()
        if(!products) {return res.send({error: ERRORS_UTILS.MESSAGES.NO_AllPRODUCT})}
        res.send(products)
    } catch (error) {
        console.log(error)
    }
})
productsRouter.get('/:id', async (req,res) => {
    try {
        const {id} = req.params
        const products = await ProductsDao.getById(id)
        if(!products) {return res.send({error: ERRORS_UTILS.MESSAGES.NO_PRODUCT})}
        res.send(products)
    } catch (error) {
        console.log(error)
    }
})
productsRouter.post('/new', verifyRole, async (req,res) => {
    try {
        const {title, description, code, price, stock, thumbnail} = req.body
    const product = await JOI_VALIDATOR.product.validateAsync({title, description, code, price, stock, thumbnail, timestamp: DATE_UTILS.getTimestamp()})
    const newProduct = await ProductsDao.save({product})
    res.send(newProduct)
    } catch (error){
        res.send({error: ERRORS_UTILS.MESSAGES.NO_CREATEPRODUCT})
    }
})
productsRouter.put('/:id', verifyRole, async (req,res) => {
    try {
        const {id} = req.params
        const {title, description, code, price, stock, thumbnail} = req.body
        const updatedProduct = await ProductsDao.updateById(id, {title, description, code, price, stock, thumbnail})
        res.send(updatedProduct)
    } catch (error){
        res.send({error: ERRORS_UTILS.MESSAGES.NO_UPDATEPRODUCT})
    }
})
productsRouter.delete("/:id",verifyRole, async (req,res) => {
    try {
        const {id} = req.params
        await ProductsDao.deleteById(id)
    res.send({succes: true})
    } catch (error) {
        res.send({error: ERRORS_UTILS.MESSAGES.NO_DELETEPRODUCT})
    }
})

export {productsRouter}