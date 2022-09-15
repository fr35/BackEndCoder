
class Usuario {
    constructor(nombre, apellido, libros = [], mascotas = []) {
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }
    getFullName() {
        return `${this.nombre} ${this.apellido}`
    }
    addMascotas(mascota) {
        this.mascotas.push(mascota)
    }
    countMascotas() {
        return this.mascotas.length
    }
    addBook(título, autor) {
        this.libros.push({título, autor})
    }
    getBookNames() {
        return this.libros.map((libro)=> libro.título)
    }
}

const usuario1 = new Usuario (
    'Facundo',
    'Rodriguez',
    [
        {título: 'Cartero', autor: 'Charles Bukowski'},
        {título: 'Mujeres', autor: 'Charles Bukowski'},
        {título: 'La senda del perdedor', autor: 'Charles Bukowski'},
        {título: 'Factótum', autor: 'Charles Bukowski'},
    ],
    ['el gallo Claudio', 'el oso Arturo']
)

console.log(usuario1.getFullName())
console.log(usuario1.countMascotas())
usuario1.addMascotas('fatiga argento')
console.log(usuario1.countMascotas())
usuario1.addBook('game of thrones', 'george R. R. Martin')
const booksNames = usuario1.getBookNames()
console.log(booksNames)
