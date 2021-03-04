const User = require('./user')
const Order = require('./order')
const Product = require('./product')

User.hasMany(Order)
Order.belongsTo(User)
Order.belongsToMany(Product, {through: 'product_order'})
Product.belongsToMany(Order, {through: 'product_order'})

// New product_order model with columns and validation order status

module.exports = {
  User,
  Order,
  Product
}
