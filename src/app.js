const express = require('express')
const cookieParser = require('cookie-parser')

const productRouter = require('./routers/products.router')
const cartRouter = require('./routers/cart.router')

const app = express()
const PORT = 8080

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/static', express.static(__dirname + '/public'))

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`)
});