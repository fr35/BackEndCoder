import { Router } from "express"
import ProductApi from "../api/index.js"

const productsRouter = Router()

productsRouter.get('/', async (req,res) => {
    const products = await ProductApi.getAll()
    res.render('tableForProducts', {products: products})
})
productsRouter.get('/new', (req,res) => {
    res.render("formProducts")
})
productsRouter.post('/new', async (req,res) => {
    const {title, price, thumbnail} = req.body
    await ProductApi.save({title, price, thumbnail})
    res.redirect('/')
})


export default productsRouter