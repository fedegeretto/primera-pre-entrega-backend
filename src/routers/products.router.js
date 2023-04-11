const { Router } = require('express')
const ProductManager = require('../productsManager')

const router = Router()
const productsList = new ProductManager('./src/productos.json')

router.get("/", async (req, res) => {
    try {
        const limit = req.query.limit
        const products = await productsList.getProducts(limit)
        res.status(200).send({ status:'success', payload: products })
    } catch (error) {
        return []
    }
})

router.get("/:pid", async (req, res) => {
    try {
        const { pid } = req.params
        const product = await productsList.getProductById(parseInt(pid))
        !product ? res.status(404).send( { status: 'error', error: "Producto no encontrado" } ) : res.status(200).send({ status:'success', payload: product })
    } catch (error) {
        return { status: 'error', error: "Producto no encontrado" } 
    }
})

router.post("/", async (req, res) => {
    try {
        const product = req.body
        const addedProduct = await productsList.addProduct(product)
        !addedProduct ? res.status(400).send({ error: "No se pudo agregar el producto" }) : res.status(201).send({status:'success', payload: product})
    } catch (error) {
        return {status: 'error', error}
    }
})

router.put("/:pid", async (req, res) => {
    try {
        const { pid } = req.params
        const modification = req.body
        const modifiedProduct = await productsList.updateProduct(parseInt(pid),modification)
        !modifiedProduct ? res.status(200).send({ status:'success', payload: modifiedProduct }) : res.status(400).send({ error: `No se pudo modificar el producto` })      
    } catch (error) {
        return { status: 'error', error: "Product no encontrado" }
    }
})

router.delete("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const removedProduct = await productsList.deleteById(parseInt(pid))
        !removedProduct ? res.status(200).send({ status:'success', message:'Producto eliminado' }) : res.status(404).send({ status: 'error', error: "Product no encontrado" } )
    } catch (error) {
        return {status: 'error', error}
    }
})

//  Para el FORMULARIO
router.post('/formulario', async (req, res) => {
    try {
        const product = req.body
        const addedProduct = await productsList.addProduct(product)
        !addedProduct
        ? res.status(400).send({ error: "No se pudo agregar el producto" })
        : res.status(201).send({status:'success', payload: addedProduct})
    } catch (error) {
        return {status: 'error', error}
    }
})

module.exports = router