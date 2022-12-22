import { normalize, schema, denormalize} from 'normalizr'
import util from "util"

const authorSchema = new schema.Entity('author')
const textSchema = new schema.Entity('text')
const messageSchema = new schema.Entity('messages', {
    author: [authorSchema],
    text: textSchema,
})

const mostar= (obj) =>console.log=('-------')+console.log(util.inspect(obj, false, 12, true))
const objNormalizado= (obj) => normalize(obj, messageSchema)
const objDesnormalizado= () => denormalize(objNormalizado.result,messageSchema,objNormalizado.entities)

const getLength = (obj) => JSON.stringify(obj).length


mostar(objNormalizado)

export {mostar, objNormalizado, objDesnormalizado, getLength}