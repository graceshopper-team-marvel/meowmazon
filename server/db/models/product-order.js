/* eslint-disable camelcase */
const Sequelize = require('sequelize')
const db = require('../db')

//Add a product to order && update through table
//await amidala.addProfile(queen, { through: { selfGranted: false } });

const Product_Order = db.define('product_order', {
  product_price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  product_quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Product_Order
