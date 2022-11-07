const { baseDeDatos } = require('./conection/index.js');
baseDeDatos.schema.createTable('products', table => {
	table.increments('id')
	table.string('name')
	table.string('code')
	table.string('description')
	table.integer('price')
	table.integer('stock')
	table.string('thumbnail')
	table.timestamp('timestamp').defaultTo(baseDeDatos.fn.now())
})
.then(() => console.log('Table created'))
.catch(err => { console.log(err)})
.finally(() => baseDeDatos.destroy())