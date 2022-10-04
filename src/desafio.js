const express = require('express')
const app = express();
const PORT = process.env.Port || 8080
const fs = require('fs')

class Desafio{
    constructor(fileName){
        this.fileName=`./${fileName}.txt`
    }
    async getAll() {
        try {
            const file = await fs.promises.readFile(this.fileName, 'utf-8')
            return JSON.parse(file)
        } catch (error) {
            if (error.code === 'ENOENT') {
                await fs.promises.writeFile(this.fileName, JSON.stringify([], null, 3))
                return []
            }
            console.log(error);
        }
    }
    async getRandomProduct() {
        try {
            const elements = await this.getAll()
            const randomProduct = elements[Math.floor(Math.random() * elements.length)]
            if (!randomProduct) return null
            return randomProduct
        } catch (error) {
            console.log(error)
        }
    }
}
const products =new Desafio('desafio')
console.log(products);
app.get('/',(req,res) => {res.send('hola mundo')})

app.get('/productos',(req,res)=>{
    products.getAll()
        .then(products=>{
            return products
        })
        .then(productsParse => {
            res.json(productsParse)
        })
})

app.get('/productoRandom',(req,res)=>{
    products.getRandomProduct()
    .then (products => {
        return products
    })
    .then(productsParse => {
        res.json(productsParse)
    })
})

const server = app.listen(PORT, () => console.log(`server listening on PORT ${PORT}`))
