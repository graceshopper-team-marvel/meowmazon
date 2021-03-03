const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

// guest cart

// currently cart is set up

// logged in user cart
router.get('/user/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    res.json(user.user_cart)
  } catch (err) {
    next(err)
  }
})
