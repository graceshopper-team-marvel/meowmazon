const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/user/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(user.user_cart)
  } catch (err) {
    next(err)
  }
})
