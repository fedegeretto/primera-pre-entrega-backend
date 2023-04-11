const {Router} = require ('express')
const CartManager = require('../cartsManager')
const ProductManager = require('../productsManager')

const router = Router();
const productsList = new ProductManager('./src/productos.json')
const cartManager = new CartManager('./src/carts.json')

router.post("/", async (req, res) => {
  await cartManager.createCart()
  res.status(201).send({ status:'success', mensaje: "Carrito creado con éxito" })
});

router.get("/:cid", async (req, res) => {
  const {cid}  = req.params
  const cart = await cartManager.getCartById(parseInt(cid))
  !cart ? res.status(404).send({ error: "Carrito no encontrado" }) : res.status(200).send({status:'success', cart})
});

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params
  const product = await productsList.getProductById(parseInt(pid))
  if (product) {
    const cart = await cartManager.addToCart(parseInt(cid), parseInt(pid))
    !cart ? res.status(404).send({ error: "Carrito no encontrado" }) : res.status(200).send(cart)
  } else {
    res.status(404).send({ error: "Producto no encontrado" })
    console.log(product);
  }
});

module.exports = router