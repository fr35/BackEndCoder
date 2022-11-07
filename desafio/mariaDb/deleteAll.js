const { baseDeDatos } = require('./connection');
baseDeDatos.from('products').del()
	.then(() => console.log('todos los productos han sido eliminados'))
	.catch(err => { console.log(err); throw err })
	.finally(() => baseDeDatos.destroy())