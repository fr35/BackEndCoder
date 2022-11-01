import { Router } from "express";
import { DATE_UTILS, ERRORS_UTILS } from '../../utils/index.js'
import { CartDao, ProductsDao} from "../../Dao/index.js"

const cartRouter = Router()

cartRouter.post("/", async (req, res) => {
    try {
        const initialCart = { timestamp: DATE_UTILS.getTimestamp(), products: [] }
        const cart = await CartDao.save(initialCart)
        res.send({success: true, cartId: cart.id})
    } catch (error) {
        res.send({error: ERRORS_UTILS.MESSAGES.NO_CREATECART})
    }
})
cartRouter.delete("/:cartId", async (req,res) => {
    try {
        const {cartId} = req.params
        const deletedCart = await CartDao.deleteById(cartId)
        res.send({success: true})
    } catch (error) {
        res.send({error: ERRORS_UTILS.MESSAGES.NO_DELETECART})
    }
})
cartRouter.get("/:cartId/products", async (req,res) => {
    try {
        const {cartId} = req.params
        const cart = await CartDao.getById(cartId)
        if(!cart) return res.send({error: ERRORS_UTILS.MESSAGES.NO_CART})
        cart.products.forEach(product => {
        console.log(product)
        })
        res.send({success: true})
    } catch (error) {
        res.send({error: ERRORS_UTILS.MESSAGES.NO_PRODUCTSONCART})
    }
})
cartRouter.post("/:cartId/products", async (req, res) => {
    try {
        const {productId} = req.body
        const {cartId} = req.params
        const cart = await CartDao.getById(cartId)
        if(!cart) return res.send({error: ERRORS_UTILS.MESSAGES.NO_CART})
        const product = await ProductsDao.getById(productId)
        if(!product) return res.send({error: ERRORS_UTILS.MESSAGES.NO_PRODUCT})
        cart.products.push(product)
        const updatedCart = await CartDao.updateById((cartId), cart)
        res.send({success: true, cart: updatedCart})
    } catch (error) {
        res.send({error: ERRORS_UTILS.MESSAGES.NO_PRODUCTTOCART})
    }
})
cartRouter.delete("/:cartId/productId", async (req,res) => {
    try {
        const {productId} = req.body
        const {cartId} = req.params
        const cart = await CartDao.getById(cartId)
        if(!cart) return res.send({error: ERRORS_UTILS.MESSAGES.NO_CART})
        const product = await ProductsDao.getById(productId)
        if(!product) return res.send({error: ERRORS_UTILS.MESSAGES.NO_PRODUCT})
        const indexProduct = cart.products.indexOf(product)
        const deleteProduct = cart.products.splice(indexProduct, 1)
        res.send({success: true})
    } catch (error) {
        res.send({error: ERRORS_UTILS.MESSAGES.NO_DELETEPRODUCTONCART})
    }
})


export {cartRouter}