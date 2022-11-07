const { baseDeDatos2} = require('./connection')
baseDeDatos2.schema.createTable('messages', table => {
	table.increments('id')
	table.string('email')
	table.string('message')
	table.timestamp('timestamp').defaultTo(baseDeDatos2.fn.now())
})
.then(() => console.log('Table created'))
.catch(err => { console.log(err)})
.finally(() => baseDeDatos.destroy())