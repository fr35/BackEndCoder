import { Router } from "express"
import ProductsDao from "../../Dao/index.js"


const productsApiRouter = Router()
productsApiRouter.get("/", async (req, res) => {
    const products = await ProductsDao.getAll()
    res.send({success: true, data: products})
})

productsApiRouter.get("/:id", async (req, res) => {
    const {id} = req.params
    const product = await ProductsDao.getById(Number(id))
    if (!product) {
    return res.send({
        success: false,
        data: undefined,
        message: "Product not found",
    })
}
    res.send({success: true, data: product})
})

productsApiRouter.post("/", async (req, res) => {
    const {title, price, thumbnail} = req.body
    const product = await ProductsDao.save({title, price, thumbnail})
    res.send({success: true, data: {id: product.id}})
})
productsApiRouter.put("/:id", async (req, res) => {
    const {id} = req.params
    const {title, price, thumbnail} = req.body
    const updatedProduct = await ProductsDao.updateById(id, {
        title,
        price,
        thumbnail,
    })
    res.send({success: true, data: {updated: updatedProduct}})
})

export default productsApiRouter