const router = require('express').Router()
const {reset} = require('nodemon')
const {Order} = require('../db/models')
const {Product, Product_Order, User} = require('../db/models')
module.exports = router

//GET /api/orders
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

//POST /api/orders
// change this to api/orders/orderId! to return the single order
router.post('/', async (req, res, next) => {
  console.log('inside order request')
  try {
    req.body.userId = req.user.dataValues.id
    const order = await Order.create(req.body)
    console.log('req.user', req.user)

    console.log('order', order)
    res.json(order)
  } catch (error) {
    next(error)
  }
})

// UPDATE Order
// PUT /api/orders
// this should live on it's own id... orders/user/userId
// our get/api/orders stores ALL the orders
// so we should use the same route to update all orders and different one for a single route

router.put('/', async (req, res, next) => {
  try {
    // product we are adding to order
    let product = await Product.findByPk(req.body.id)
    // we will use this to update the product quantity
    let productId = product.id

    // current user
    req.body.userId = req.user.dataValues.id

    // see if pending order exists already
    let order = await Order.findOne({
      where: {
        order_status: 'pending',
        userId: req.body.userId
      },
      include: Product
    })

    // if it doesn't create it
    if (!order) {
      order = await Order.create({
        order_status: 'pending',
        userId: req.body.userId,
        order_price: req.body.product_price
      })

      // if the order does exist
    } else {
      // does the product we are adding already exist in that order?
      let productAlreadyInOrder = await Product_Order.findOne({
        where: {orderId: order.id, productId: product.id}
      })

      console.log('productAlreadyInOrder', productAlreadyInOrder)
      // if it does contain the product increment it this isn't workding yet:

      // if (productAlreadyInOrder) {
      //   productAlreadyInOrder.update({
      //     product_quantity: productsOrder.product_quantity++
      //   })
      // } else {
      // if it doesn't exist add it:
      await order.addProduct(product, {
        through: {
          product_price: req.body.product_price * 1,
          product_quantity: 1
        }
      })
      // }
      // and either way update the final order total
      await order.update({
        order_price: (order.order_price += req.body.product_price)
      })
    }

    // let updatedOrder = await Order.findOne({
    //   where: {
    //     order_status: 'pending',
    //     userId: req.body.userId,
    //   },
    //   include: Product,
    // })

    res.send(order)
  } catch (err) {
    next(err)
  }
})

//Gets a Users' Cart: Current Pending Order
//api/orders/user/:userId

router.get('/user/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    // const user = await User.findByPk(userId)
    const order = await Order.findOne({
      where: {userId: userId, order_status: 'pending'},
      include: Product
    })

    res.json(order)
  } catch (error) {
    next(error)
  }
})

//api/orders/user/userId
// deletes product from cart

router.delete('/user/:userId', async (req, res, next) => {
  try {
    let product = await Product.findByPk(req.body.id)
    const userId = req.params.userId
    // const user = await User.findByPk(userId)
    const order = await Order.findOne({
      where: {userId: userId, order_status: 'pending'},
      include: Product
    })

    let products = await Product_Order.findAll({
      where: {orderId: order.id, productId: product.id}
    })

    await order.removeProduct(
      product
      // , {
      // through: {
      //   product_price: req.body.product_price * 1,
      //   product_quantity: 1,
      // },
      // }
    )
    product.destroy()

    res.json(order)
  } catch (error) {
    next(error)
  }
})

// OLD WAY TO GET PRODUCTS FROM THE ORDER BEFORE EAGER LOADING:
// don't need this route! here as backup
// GET /api/orders/user/userId/products

// router.get('/user/:userId/products', async (req, res, next) => {
//   try {
//     const userId = req.params.userId

//     const order = await Order.findOne({
//       where: {userId: userId, order_status: 'pending'},
//       // figure out how to grab the products...
//     })

//     let products = await Product_Order.findAll({
//       where: {orderId: order.id},
//     })

//     console.log('products inside axios prodcuts call', products)
//     res.send(products)
//   } catch (error) {
//     next(error)
//   }
// })
