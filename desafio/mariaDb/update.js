const { baseDeDatos } = require('./connection');
baseDeDatos.from('products').where('id', '2').update({price: 3500000})
	.then((cant) => console.log('producto actualizado',cant))
	.catch(err => { console.log(err); throw err })
	.finally(() => baseDeDatos.destroy())