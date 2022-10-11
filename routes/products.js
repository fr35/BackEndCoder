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

router.get("/update/:id",async (req,res)=>{
  const { id } = req.params
  const products =  await productsFunction.getById(id)
  const formInfo = {
    botonName:"Actualizar",
    metodo:"PUT",
    url:"/products/update/"+id
  }
  return res.render("products/change", {products , ...formInfo})
})

router.get("/add", (req, res) => {
  const formInfo={
    botonName:"Crear",
    metodo:"POST",
    url:"/products/add"
  }
  res.render("products/change",formInfo)
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

router.post("/add", async (req,res)=>{
  try {
    const { title, price, thumbnail } = req.body
    await productsFunction.create({title,price,thumbnail})
    res.redirect("/products/list")
  } catch (error) {
    res.redirect("/error")
  }
});
router.put("/update/:id",async (req,res)=>{
  try {
    const { id } = req.params
    const { title,price,thumbnail} = req.body
    await productsFunction.modify(id,{title,price,thumbnail})
    res.redirect("/products/list")
  } catch (error) {
    res.redirect("/error")
  }
})

module.exports = router