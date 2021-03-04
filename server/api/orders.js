const router = require('express').Router()
const {Order} = require('../db/models')
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
  try {
    req.body.userId = req.user.dataValues.id
    const order = await Order.create(req.body)
    res.json(order)
  } catch (error) {
    next(error)
  }
})
