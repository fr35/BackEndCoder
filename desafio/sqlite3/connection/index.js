const options = {
	client: 'sqlite3',
	connection: {
		filename:'./db.sqlite'
	}
}
const messagesDataBase = require('knex')(options)
module.exports = {
	messagesDataBase
}