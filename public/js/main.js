const socket = io.connect()

//Products
const addProduct = (e) => {
    e.preventDefault()
    const title = document.getElementById("title")
    const price = document.getElementById("price")
    const thumbnail = document.getElementById("thumbnail")
    const formProduct = document.getElementById('formProduct')
    socket.emit("addProduct", {
        title: title.value,
        price: price.value,
        thumbnail: thumbnail.value,
    })
    title.value = ""
    price.value = ""
    thumbnail.value = ""
}
document.getElementById("formProduct").addEventListener("submit", addProduct)

const productTable = async (products) => {
    const template = await fetch('/views/productsList.hbs')
    const templateText = await template.text()
    const templateCompiled = Handlebars.compile(templateText)
    return templateCompiled({products})
}
socket.on("allProducts", async (products) => {
    const template = await productTable(products)
    document.getElementById("allProducts").innerHTML = template
})
//Messages
const newMessage = (e) => {
    e.preventDefault()
    const email = document.getElementById("email")
    const text = document.getElementById("text")
    const formMessage = document.getElementById('formMessage')
    socket.emit('newMessage', {
        email: email.value,
        text: text.value,
    })
    email.value = ''
    text.value = ''
}
document.getElementById('formMessage').addEventListener('submit', newMessage)

const messageContainer = async (messages) => {
    const template = await fetch('/views/messagesList.hbs')
    const templateText = await template.text()
    const templateCompiled = Handlebars.compile(templateText)
    return templateCompiled({messages})
}
socket.on('messages', async (messages) => {
    const template = await messageContainer(messages)
    document.getElementById('messagesContainer').innerHTML = template
})



