/* eslint-disable camelcase */
const router = require('express').Router()
// const {reset} = require('nodemon')
const {Product, Product_Order, User, Order} = require('../db/models')
module.exports = router

function isAdmin(req, res, next) {
  if (req.user && req.user.dataValues.user_type === 'admin') {
    next()
  } else {
    res.json('Access denied')
  }
}

//GET /api/orders
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [User]
    })
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

//PUT /api/orders/:orderId ---> Updates order on submit
router.put('/:orderId', async (req, res, next) => {
  try {
    //Grab the order
    let {orderId} = req.params
    let order = await Order.findByPk(orderId)
    //Update it to complete, with order shipping info
    if (!order) {
      res.sendStatus(404)
    } else {
      order = await order.update({
        order_status: 'complete',
        order_shipping_address: req.body.order_shipping_address,
        order_billing_address: req.body.order_billing_address
      })
      //Grab the user
      let user = await User.findByPk(order.userId)
      //Update user info
      if (!user.user_billing_address) {
        await user.update({
          user_billing_address: req.body.order_billing_address
        })
      }
      if (!user.user_shipping_address) {
        await user.update({
          user_shipping_address: req.body.order_shipping_address
        })
      }
      res.json(order).status(202)
    }
  } catch (error) {
    next(error)
  }
})

// UPDATE Order
// PUT /api/orders

// we probably want this to live on a route with user or order id
// b/c api/orders stores ALL orders // so updates on this route should update all
// this sends back one updated order // so should have its own

router.put('/', async (req, res, next) => {
  try {
    // gets an object with product on key "product"
    // qty on key "value"

    // product we are adding to order
    let product = await Product.findByPk(req.body.product.id)

    // we will use this to update the product quantity
    let productQty = req.body.value * 1
    // let prevQty = req.body.product.product_order.product_quantity
    let productPrice = req.body.product.product_price * 1

    // current user
    let userId = req.user.dataValues.id

    // see if pending order exists already
    let order = await Order.findOne({
      where: {
        order_status: 'pending',
        userId: userId
      },
      include: Product
    })

    // if it doesn't create it
    if (!order) {
      order = await Order.create({
        order_status: 'pending',
        userId: userId,
        order_price: productPrice * productQty
        // include: [{model: Product, through: {Product_Order}}],
      })

      // have to create the first productOrder row to pass the info we want
      let productOrder = await Product_Order.create({
        product_price: productPrice,
        product_quantity: productQty,
        productId: req.body.product.id,
        orderId: order.id
      })

      // adds product to the order
      order = await order.addProduct(req.body.product, {
        through: {
          product_price: productPrice,
          product_quantity: productQty
        }
      })

      // if the order does exist
    } else {
      // does the product we are adding already exist in that order?
      let productAlreadyInOrder = await Product_Order.findOne({
        where: {orderId: order.id, productId: req.body.product.id}
      })
      // if it's already in the order we will update the quantity
      if (productAlreadyInOrder) {
        await Product_Order.update(
          {product_quantity: productQty},
          {
            where: {
              orderId: order.id,
              productId: req.body.product.id
            }
          }
        )
      } else {
        // if it doesn't exist add it:
        await order.addProduct(product, {
          through: {
            product_price: productPrice,
            product_quantity: productQty
          }
        })
      }

      //updateOrder.products = array of all products
      //updatedOrder.products.product.product_order.product_quantity
      let prevOrder = await Order.findOne({
        where: {
          order_status: 'pending',
          userId: userId
        },
        include: [{model: Product, through: {Product_Order}}]
      })

      // In Both Cases We Will Update the final order total
      await order.update({
        order_price: prevOrder.products.reduce((sum, singleProduct) => {
          if (singleProduct.id === req.body.product.id) {
            return sum + productQty * productPrice
          } else {
            return (
              sum +
              singleProduct.product_order.product_quantity *
                singleProduct.product_order.product_price
            )
          }
        }, 0)
      })
    }

    // then grab the updatedOrder re-eagerloading the products to send
    let updatedOrder = await Order.findOne({
      where: {
        order_status: 'pending',
        userId: userId
      },
      include: Product
    })

    res.send(updatedOrder)
  } catch (error) {
    next(error)
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
    if (!order) {
      res.send('Cart Not Found')
    } else {
      res.json(order)
    }
  } catch (error) {
    next(error)
  }
})

//api/orders/user/userId
// deletes product from cart

router.delete('/user/:userId/:productId', async (req, res, next) => {
  try {
    let productId = req.params.productId
    let product = await Product.findByPk(productId)
    const userId = req.params.userId

    let oldOrder = await Order.findOne({
      where: {
        order_status: 'pending',
        userId: userId
      },
      include: [{model: Product, through: {Product_Order}}]
    })

    await Product_Order.destroy({
      where: {productId: productId, orderId: oldOrder.id}
    })

    let order = await Order.findOne({
      where: {
        order_status: 'pending',
        userId: userId
      },
      include: [{model: Product, through: {Product_Order}}]
    })

    await order.update({
      order_price: order.products.reduce((sum, singleProduct) => {
        return (
          sum +
          singleProduct.product_order.product_quantity *
            singleProduct.product_order.product_price
        )
      }, 0)
    })

    let updatedOrder = await Order.findOne({
      where: {userId: userId, order_status: 'pending'},
      include: Product
    })

    res.json(updatedOrder).status()
  } catch (error) {
    next(error)
  }
})
