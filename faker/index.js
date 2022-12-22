import { faker } from '@faker-js/faker';

let fakerProductsTable = "NOMBRE;PRECIO;FOTO\r\n"

for(let i=0; i<5; i++) {
    fakerProductsTable +=  
    faker.commerce.product() +
    ';' + faker.commerce.price({min: 100, max: 500, dec: 0}) +
    ';' + faker.image.business +
    '\r\n'
}

export {fakerProductsTable}



