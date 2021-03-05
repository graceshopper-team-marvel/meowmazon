const router = require('express').Router()
const {Order} = require('../db/models')
const {Product} = require('../db/models')
module.exports = router

//GET /api/orders
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

//POST /api/orders
router.post('/', async (req, res, next) => {
  console.log('inside order request')
  try {
    req.body.userId = req.user.dataValues.id
    const order = await Order.create(req.body)
    console.log('req.user', req.user)

    console.log('order', order)
    res.json(order)
  } catch (error) {
    next(error)
  }
})
// PUT /api/orders

router.put('/', async (req, res, next) => {
  try {
    console.log('req.body--------->', req.body)

    req.body.userId = req.user.dataValues.id
    // console.log('hi')
    // const orderId=
    const order = Order.findAll({
      where: {
        order_status: 'pending',
        userId: req.body.userId
      }
    })
    order.addProduct(req.body, {
      through: {
        product_price: req.body.product_price,
        product_quantity: req.body.product_quantity
      }
    })

    res.send(order)
  } catch (err) {
    next(err)
  }
})
