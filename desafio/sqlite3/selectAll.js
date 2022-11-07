const {baseDeDatos2} = require('./connection')
baseDeDatos2.from('messages').select('*')
	.then(messages => {
		for (message of messages) {
			console.log(`${message['email']} ${message['message']} ${message['timestamp']}`)
		}
	})
	.catch(err => console.log(err))
	.finally(() => baseDeDatos2.destroy())