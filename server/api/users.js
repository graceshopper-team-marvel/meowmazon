const router = require('express').Router()
const {User, Order} = require('../db/models')
module.exports = router

function isAdmin(req, res, next) {
  if (req.user && req.user.dataValues.user_type === 'admin') {
    next()
  } else {
    res.json('Access denied')
  }
}

// GET /api/users
router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'user_email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// GET /api/users/:userId

router.get('/:userId', isAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    if (!user) {
      res.sendStatus(404)
    } else {
      res.json({user})
    }
  } catch (error) {
    next(error)
  }
})

// PUT /api/users/:userId

router.put('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    if (!user) {
      res.sendStatus(404)
    } else {
      res.json(await user.update(req.body))
    }
  } catch (error) {
    next(error)
  }
})

//GET /api/users/orders
router.get('/orders', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.user.dataValues.id
      }
    })
    res.json(orders)
  } catch (error) {
    next(error)
  }
})
