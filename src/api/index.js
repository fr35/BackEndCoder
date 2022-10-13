import Container from "../container/container.js"

const PRODUCTS_FILENAME = "products" //nombre del archivo dataBase
const ProductApi = new Container(PRODUCTS_FILENAME)

export default ProductApi