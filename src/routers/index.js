import { Router } from "express"
import ProductApi from "../api/index.js"


const indexRouter = Router();
indexRouter.get("/", (req, res) => {
    res.render('index')
})

export default indexRouter