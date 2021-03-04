const User = require('./user')
const Order = require('./order')
const Product = require('./product')
const Product_Order = require('./product-order')

User.hasMany(Order)
Order.belongsTo(User)
Order.belongsToMany(Product, {through: Product_Order})
Product.belongsToMany(Order, {through: Product_Order})


module.exports = {
  User,
  Order,
  Product,
  Product_Order
}
