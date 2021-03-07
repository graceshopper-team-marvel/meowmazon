const router = require('express').Router()
const {Order, User} = require('../db/models')
module.exports = router

function isAdmin(req, res, next) {
  if (req.user && req.user.dataValues.user_type === 'admin') {
    next()
  } else {
    res.json('Access denied')
  }
}

//GET /api/orders
router.get('/', isAdmin, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [User]
    })
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
