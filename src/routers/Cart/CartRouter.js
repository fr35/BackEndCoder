import { Router } from "express";
import { DATE_UTILS } from '../../utils/index.js'
import { CartDao, ProductsDao} from "../../Dao/index.js"

const cartRouter = Router()

//Me salta error en postman del cartID dice que cart.id es undefined, pero probe sin eso y no me crea el cart, 
cartRouter.post("/", async (req, res) => {
    const initialCart = { timestamp: DATE_UTILS.getTimestamp(), products: [] }
    const cart = await CartDao.save(initialCart)
    res.send({success: true, cartId: cart.id})
})

cartRouter.post("/:cartId/products", async (req, res) => {
    const {productId} = req.body
    const {cartId} = req.params
    const cart = await CartDao.getById(cartId)
    if(!cart) return res.send({error: true, message: "no se encontro el carrito"})
    const product = await ProductsDao.getById(productId)
    if(!product) return res.send({error: true, message: "no se encontro el producto"})
    cart.products.push(product)
    const updatedCart = await CartDao.updateById((cartId), cart)
    res.send({success: true, cart: updatedCart})
})

export {cartRouter}