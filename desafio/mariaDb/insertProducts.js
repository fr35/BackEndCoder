const { baseDeDatos } = require('./connection');
const products = [
	{name: 'CHEVROLET S10', description: 'CABINA DOBLE 4X4 LTZ AT', code: "S10", price: 7964000, stock:10, thumbnail: "https://www.chevrolet.com.ar/content/dam/chevrolet/mercosur/argentina/espanol/index/pickups-and-trucks/2021-s10-cd/01-images/colorizer/s10-cab-dupla-switchblade-silver.jpg?imwidth=960"},
	{name: 'CHEVROLET ONIX PLUS', description: "1.2 LT TECH", code: "ONXPLS", price: 3171740, stock:20, thumbnail: "https://www.chevrolet.com.ar/content/dam/chevrolet/mercosur/argentina/espanol/index/cars/2020-onix-plus-premier/01-images/colorizer/julio-20/colorizer-onix%20plus-premier-black.png?imwidth=960"},
	{name: 'CHEVROLET ONIX PLUS', description: "LTZ 1.0 T AT", code: "ONXPLS", price: 3525900, stock:3, thumbnail: "https://www.chevrolet.com.ar/content/dam/chevrolet/mercosur/argentina/espanol/index/cars/2020-onix-plus-premier/01-images/colorizer/julio-20/colorizer-onix%20plus-premier-white.png?imwidth=960" },
	{name: 'CHEVROLET ONIX', description: "LTZ 1.0 T AT", code: "ONIX", price: 3523000, stock:8, thumbnail: "https://acroadtrip.blob.core.windows.net/catalogo-imagenes/xl/RT_V_0d008ceaa2eb419883ad5c2f1eea7838.jpg"},
]
baseDeDatos('products').insert(products)
	.then(() => console.log('productos agregados'))
	.catch(err => { console.log(err); })
	.finally(() => baseDeDatos.destroy())