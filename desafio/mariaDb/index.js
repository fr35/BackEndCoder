// Crear tabla
const {productDataBase} = require('./conection/index.js')

const createTable = () => {
    productDataBase.schema.createTable('products', table => {
        table.increments('id')
        table.string('name')
        table.string('code')
        table.string('description')
        table.integer('price')
        table.integer('stock')
        table.string('thumbnail')
        table.timestamp('timestamp').defaultTo(productDataBase.fn.now())
    })
    .then(() => console.log('Table created'))
    .catch(err => { console.log(err)})
    .finally(() => productDataBase.destroy())
}

// Agregar uno o mas productos
const products = [
	{name: 'CHEVROLET S10', description: 'CABINA DOBLE 4X4 LTZ AT', code: "S10", price: 7964000, stock:10, thumbnail: "https://www.chevrolet.com.ar/content/dam/chevrolet/mercosur/argentina/espanol/index/pickups-and-trucks/2021-s10-cd/01-images/colorizer/s10-cab-dupla-switchblade-silver.jpg?imwidth=960"},
	{name: 'CHEVROLET ONIX PLUS', description: "1.2 LT TECH", code: "ONXPLS", price: 3171740, stock:20, thumbnail: "https://www.chevrolet.com.ar/content/dam/chevrolet/mercosur/argentina/espanol/index/cars/2020-onix-plus-premier/01-images/colorizer/julio-20/colorizer-onix%20plus-premier-black.png?imwidth=960"},
	{name: 'CHEVROLET ONIX PLUS', description: "LTZ 1.0 T AT", code: "ONXPLS", price: 3525900, stock:3, thumbnail: "https://www.chevrolet.com.ar/content/dam/chevrolet/mercosur/argentina/espanol/index/cars/2020-onix-plus-premier/01-images/colorizer/julio-20/colorizer-onix%20plus-premier-white.png?imwidth=960" },
	{name: 'CHEVROLET ONIX', description: "LTZ 1.0 T AT", code: "ONIX", price: 3523000, stock:8, thumbnail: "https://acroadtrip.blob.core.windows.net/catalogo-imagenes/xl/RT_V_0d008ceaa2eb419883ad5c2f1eea7838.jpg"},
]
const addProduct = (product) => {
    productDataBase('products').insert(product)
	.then(() => console.log('productos agregados'))
	.catch(err => { console.log(err)})
	.finally(() => productDataBase.destroy())
}

// Seleccionar todos
const selectAll = () => {
    productDataBase.from('products').select('*')
	.then(products => {
		for (product of products) {
			console.log(`${product['id']} ${product['name']} ${product['description']} ${product['code']} ${product['price']} ${product['stock']}`)
		}
	})
	.catch(err => console.log(err))
	.finally(() => productDataBase.destroy())
}

// Seleccionar por id

const selectById = (id) => {
    productDataBase.from('products').select("*").where('id',id)
    .then((products) => {
        for (product of products) {
            console.log(`${product['id']} ${product['name']} ${product['description']} ${product['code']} ${product['price']} ${product['stock']}`)
        }
    })
    .catch((err) => { console.log( err); throw err })
    .finally(() => {productDataBase.destroy()})
}

// Modificar producto buscandolo por su id
const updateProductById = (id, data) => {
    productDataBase.from('products').where('id', id).update(data)
	.then((cant) => console.log('producto actualizado',cant))
	.catch(err => { console.log(err); throw err })
	.finally(() => productDataBase.destroy())
}

// Eliminar todos los productos
const deleteAll = () => {
    productDataBase.from('products').del()
	.then(() => console.log('todos los productos han sido eliminados'))
	.catch(err => { console.log(err); throw err })
	.finally(() => productDataBase.destroy())
}

// Eliminar un producto por su id
const deleteById = (id) => {
    productDataBase.from('products').where('id',id).del()
	.then((val) => console.log('producto eliminado',val))
	.catch(err => { console.log(err)})
	.finally(() => productDataBase.destroy())
}

export {createTable, addProduct, selectAll, selectById, updateProductById, deleteAll, deleteById}
