const { baseDeDatos2} = require('./connection')
const messages = [
	{ email: 'facundorodriguezgranieri@gmail.com', message: "Hola mundo"},
    {email: "chat@chat", message: "Hola soy un chat"},
    {email: "chat@chat", message: "\"chat\""},
	{email: "facundorodriguezgranieri@gmail.com", message: "Hola chat"}
]
baseDeDatos2('messages').insert(messages)
	.then(data => console.log(data))
	.catch(err => { console.log(err)})
	.finally(() => baseDeDatos2.destroy()) 