import { Container } from "./containers/Containers.js";

const productContainer = new Container("productos")

productContainer.getAll() 
    .then((data)=> console.log({data}))
    .catch((error)=> console.log({error}))

productContainer.save({
    tittle: 'Johnnie Walker Red Label',
    price: 5000,
    thumbnail: 'http://d3ugyf2ht6aenh.cloudfront.net/stores/001/151/809/products/red-label-1-litro1-9ac7a914d4540e853415871579831540-640-0.jpg',
})
    .then((data)=> console.log({data}))
    .catch((error)=> console.log({error}))

productContainer.getById(1)
    .then(product => console.log({product}))
    .catch(error => console.log({error}))

productContainer.deleteById(100)
.then(product => console.log({product}))
.catch(error => console.log({error}))

productContainer.deleteAll()



