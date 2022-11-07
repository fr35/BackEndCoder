const options = {
	client: 'mysql',
	connection: {
		host: '127.0.0.1',
		user: 'root',
		password: '',
		database: 'institution'
	}
}
const knex= require('knex')(options)
//Crear Tabla
knex.schema.createTable('meets', (table) => {
        table.increments('id')
        table.string('title')
        table.integer('price')
        table.string('thumbnail')
})
.catch(e=>console.log(e.sqlMessage))
//Insertar 
knex
.from('employees')
.insert({name: 'Ariel'})
.then(id => console.log( `insertado id: ${id[0]}`))
.catch(e=>console.log({e}))
//Modificar
knex
.from('employees')
.where({name: "Ariel", id: 9})
.update({name: "Daniel"})
.then(rep => console.log({rep}))
.catch(e=>console.log({e}))
//Buscar
knex
.from('employees')
.select('id', 'name')
.orderBy('id','desc')
.then( lista => lista.forEach(element => {
    console.log(element)
}))
//Eliminar
knex
.from('employees')
.where({name: "Ariel", id: 10})
.del()
.then(a=>{
    console.log('eliminado',a)
})
.catch(e=>console.log({e}))



