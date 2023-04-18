const { Router } = require('express')
const router = Router()
const ProductManager = require('../productsManager')
const productsList = new ProductManager('./src/productos.json')

router.get('/', async (req, res) => {
    const limit = req.query.limit
    const products = await productsList.getProducts(limit)
    const objeto = {
        title: "Lista de productos",
        products
    }
    res.render('index', objeto)
    console.log(products)
})

router.get("/realTimeProducts", async (req, res) => {
    const products = await productsList.getProducts();
    const object = {
        title: "Productos en tiempo real",
        products,
    };
    res.render("realTimeProducts", object);
});

module.exports = router