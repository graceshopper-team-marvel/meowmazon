const User = require('./user')
const Order = require('./order')
const Product = require('./product')

User.hasMany(Order)
Order.belongsTo(User)
Order.belongsToMany(Product, {through: 'product/order'})
Product.belongsToMany(Order, {through: 'product/order'})

module.exports = {
  User,
  Order,
  Product
}
