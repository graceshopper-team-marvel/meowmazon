/* eslint-disable camelcase */
const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  order_price: {
    type: Sequelize.INTEGER,
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
  order_status: {
    type: Sequelize.ENUM('pending', 'complete'),
    allowNull: false,
    defaultValue: 'pending'
  }
})

module.exports = Order
