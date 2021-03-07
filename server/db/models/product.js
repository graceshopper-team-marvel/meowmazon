/* eslint-disable camelcase */
const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  product_name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  product_price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  product_description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  product_image: {
    type: Sequelize.STRING,
    defaultValue: 'https://picsum.photos/200'
  },
  product_category: {
    type: Sequelize.ENUM('cat')
  },
  product_stock: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  }
})

module.exports = Product
