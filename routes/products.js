const { Router} = require("express")
const router = Router()
const CRUD = require('../server/index')
const productsFunction = new CRUD('products_database.txt')


router.get("/list", async(req,res)=>{
  const products = await productsFunction.getAll()
  res.render("products/list", {
    products,
  })
})

router.get("/edit/:id",async (req,res)=>{
  const { id } = req.params
  const products =  await productsFunction.getById(id)
  const formInfo = {
    botonName:"Actualizar",
    metodo:"PUT",
    url:"/products/edit/"+id
  }
  return res.render("/products/formProduct.hbs", {products , ...formInfo})
})

router.get("/create", (req, res) => {
  const formInfo={
    botonName:"Crear",
    metodo:"POST",
    url:"/products/create"
  }
  res.render("/products/formProduct",formInfo)
})


router.get("/delete/:id", async(req,res)=>{
  try{
    const { id } = req.params
    await productsFunction.delete(id)
    res.redirect("/products/list")
  }
  catch(error){
    res.redirect("/error")
  }
})

router.post("/create", async (req,res)=>{
  try {
    const {title,price,thumbnail} = req.body
    await productsFunction.create({title,price,thumbnail})
    res.redirect("/products/list")
  } catch (error) {
    res.redirect("/error")
  }
});
router.post("/edit/:id",async (req,res)=>{
  try {
    const {id} = req.params
    const {title,price,thumbnail} = req.body
    await productsFunction.modify(id,{title,price,thumbnail})
    res.redirect("/products/list")
  } catch (error) {
    res.redirect("/error")
  }
})

module.exports = router