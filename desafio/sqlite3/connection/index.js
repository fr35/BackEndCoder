const options = {
	client: 'sqlite3',
	connection: {
		filename:'./db.sqlite'
	}
}
const baseDeDatos2 = require('knex')(options)
module.exports = {
	baseDeDatos2
}