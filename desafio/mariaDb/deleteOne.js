const { baseDeDatos } = require('./connection');
baseDeDatos.from('products').where('id',23).del()
	.then((val) => console.log('producto eliminado',val))
	.catch(err => { console.log(err)})
	.finally(() => baseDeDatos.destroy())