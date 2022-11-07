const { baseDeDatos } = require('./connection');
baseDeDatos.from('products').select('*')
	.then(products => {
		for (product of products) {
			console.log(`${product['id']} ${product['name']} ${product['description']} ${product['code']} ${product['price']} ${product['stock']}`)
		}
	})
	.catch(err => console.log(err))
	.finally(() => baseDeDatos.destroy())