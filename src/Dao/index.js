import Container from "../container/container.js"

const PRODUCTS_FILENAME = "products" //nombre del archivo dataBase
const MESSAGES_FILENAME = "messages"
const ProductsDao = new Container(PRODUCTS_FILENAME)
const MessagesDao = new Container(MESSAGES_FILENAME)

export {ProductsDao, MessagesDao}