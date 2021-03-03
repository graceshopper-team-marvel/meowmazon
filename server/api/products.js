const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

//GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    console.log(products)
    res.json(products)
  } catch (error) {
    next(error)
  }
})

//GET /api/products/:productId
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    res.json(product)
  } catch (error) {
    next(error)
  }
})
