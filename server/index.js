const fs = require('fs')
class CRUD {
    constructor(fileName) {
        this.fileName = __dirname+'/'+fileName
    }
    async create(element) {
        try {
            const readFile = await this.getAll()
            const id = readFile.length === 0 ? 1 : readFile[readFile.length - 1].id + 1
            element.id = id
            readFile.push(element)
            this.writeData(readFile)
            return element
        } catch(error) {
            console.log(error)
            throw new Error(error)
        }
    }

    async getById(id) {
        try {
            const elements = await this.getAll()
            const element = elements.find(el => el.id == id )
            return element ? element : null
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    async update(id,elementMod) {
        try {
            elementModify["id"]=id
            const elements = await this.getAll();
            const element = elements.find(el => el.id == id )
            if(!element) {
                throw new Error('no existe el id '+id)
            }
            const elementsModify = elements.map(el =>{
                    if( el.id == id )
                    return elementMod
                    return el
            })
            this.writeData(elementsModify)
            return elementMod
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    async getAll() {
        try {
            const data = await this.readData(this.fileName)
            return data
        } catch (error) {
            return []
        }
    }

    async delete(id) {
        try {
            const elements = await this.getAll()
            const filterElements= elements.filter(el =>  el.id != id )
            this.writeData(filterElements)
        } catch (error) {
            throw new Error(error)
        }
    }
    readData(path) {
        const data = JSON.parse(fs.readFileSync(path, 'utf-8')||'[]')
        return data
    }
    writeData(elements) {
        fs.writeFileSync(this.fileName, JSON.stringify(elements, null, 2))
    }
}

module.exports = CRUD