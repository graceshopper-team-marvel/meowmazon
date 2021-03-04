/* eslint-disable camelcase */
const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  order_price: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  order_shipping_address: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  order_billing_address: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  order_email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  order_status: {
    type: Sequelize.ENUM('pending', 'complete'),
    allowNull: false,
    defaultValue: 'pending'
  }
})

module.exports = Order
