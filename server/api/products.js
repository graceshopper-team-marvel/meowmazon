const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

// function isAdmin(req, res, next) {
//   if (req.user.dataValues.user_type === 'admin') {
//     next()
//   } else {
//     res.json('Denied access')
//   }
// }

//GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
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
