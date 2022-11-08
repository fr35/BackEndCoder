const {messagesDataBase} = require('./connection')
// Crear tabla
const createTableMessage = () => {
    messagesDataBase.schema.createTable('messages', table => {
        table.increments('id')
        table.string('email')
        table.string('message')
        table.timestamp('timestamp').defaultTo(messagesDataBase.fn.now())
    })
    .then(() => console.log('Table created'))
    .catch(err => { console.log(err)})
    .finally(() => messagesDataBase.destroy())
}
// Add Message
const messages = [
	{ email: 'facundorodriguezgranieri@gmail.com', message: "Hola mundo"},
    {email: "chat@chat", message: "Hola soy un chat"},
    {email: "chat@chat", message: "\"chat\""},
	{email: "facundorodriguezgranieri@gmail.com", message: "Hola chat"}
]
const addMessage = (message) => {
    messagesDataBase('messages').insert(message)
	.then(data => console.log(data))
	.catch(err => { console.log(err)})
	.finally(() => messages.destroy()) 
}
// Select All
const getAllMessages = () => {
    messagesDataBase.from('messages').select('*')
	.then(messages => {
		for (message of messages) {
			console.log(`${message['email']} ${message['message']} ${message['timestamp']}`)
		}
	})
	.catch(err => console.log(err))
	.finally(() => messagesDataBase.destroy())
}

export {createTableMessage, addMessage, getAllMessages}
