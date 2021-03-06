const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

function isAdmin(req, res, next) {
  if (req.user && req.user.dataValues.user_type === 'admin') {
    next()
  } else {
    res.json('Access denied')
  }
}

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

router.get('/:userId', isAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    res.json({user})
  } catch (error) {
    next(error)
  }
})
