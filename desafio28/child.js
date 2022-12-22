const getAleatorio = () => parseInt(Math.random() * 1000) + 1;
const aleatorio =getAleatorio()
process.send(aleatorio)
process.exit()

