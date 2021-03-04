/* eslint-disable camelcase */
const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  user_email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  user_password: {
    type: Sequelize.STRING,
    allowNull: false,
    get() {
      return () => this.getDataValue('password')
    }
  },
  user_full_name: {
    type: Sequelize.STRING
  },
  user_billing_address: {
    type: Sequelize.TEXT
  },
  user_shipping_address: {
    type: Sequelize.TEXT
  },
  user_phone: {
    type: Sequelize.STRING
  },
  user_cart: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  user_type: {
    type: Sequelize.ENUM('admin', 'customer')
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})
