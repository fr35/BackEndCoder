import Container from "../Containers/container.js"

const PRODUCTS_FILENAME = "products" //nombre del archivo dataBase
const MESSAGES_FILENAME = "messages"
const CART_FILENAME = "cart"

const ProductsDao = new Container(PRODUCTS_FILENAME)
const MessagesDao = new Container(MESSAGES_FILENAME)
const CartDao = new Container(CART_FILENAME)

export {ProductsDao, MessagesDao, CartDao}