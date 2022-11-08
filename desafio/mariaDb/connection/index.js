const options = {
	client: 'mysql',
	connection: {
		host: '127.0.0.1',
		user: 'root',
		password: '',
		database: 'backendCoder'
	}
}
const productDataBase = require('knex')(options)

module.exports = {
	productDataBase
}