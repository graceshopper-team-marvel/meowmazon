import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addNewOrder} from '../store/orders'

class Checkout extends Component {
  constructor() {
    super()
    this.dummyCart = [
      {
        product_name: 'Pizza Bed',
        product_price: 19.99,
        product_description:
          "This pizza bed is designed to hold in your cat's body heat just like a pizza fresh out of the oven.",
        product_image: '/images/pizzaBed.png',
        product_category: 'cat',
        product_quantity: 100
      },
      {
        product_name: "Lick'em Brush",
        product_price: 12.99,
        product_description:
          'Lick your cat back and groom them at the same time!',
        product_image: '/images/catLicker.jpeg',
        product_category: 'cat',
        product_quantity: 55
      },
      {
        product_name: 'Bubble Backpack',
        product_price: 25.99,
        product_description:
          'Give your cat a view while you carry them around!',
        product_image: '/images/backPack.jpg',
        product_category: 'cat',
        product_quantity: 74
      },
      {
        product_name: 'Cat Mittens',
        product_price: 9.99,
        product_description: 'Stylish Cat Hands',
        product_image: '/images/catMittens.jpg',
        product_category: 'cat',
        product_quantity: 0
      }
    ]
    this.state = {
      shippingAddress: '',
      billingAddress: '',
      customerEmail: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.calculatePrice = this.calculatePrice.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.addNewOrder({
      order_price: this.calculatePrice(),
      order_shipping_address: this.state.shippingAddress,
      order_billing_address: this.state.billingAddress,
      order_email: this.state.customerEmail
    })
    this.setState({
      shippingAddress: '',
      billingAddress: '',
      customerEmail: ''
    })
  }

  calculatePrice() {
    //must pass down cart as an array of products on props
    return this.dummyCart.reduce((total, product) => {
      total += product.product_price
      return total
    }, 0)
  }

  render() {
    return (
      <div>
        <div id="totalPrice">
          <h1>Your total: {this.calculatePrice()}</h1>
        </div>
        <form id="checkoutForm" onSubmit={this.handleSubmit}>
          <label htmlFor="customerEmail">Email:</label>
          <input
            name="customerEmail"
            onChange={this.handleChange}
            value={this.state.customerEmail}
          />
          <label htmlFor="shippingAddress">Shipping Address:</label>
          <input
            name="shippingAddress"
            onChange={this.handleChange}
            value={this.state.shippingAddress}
          />
          <label htmlFor="billingAddress">Billing Address:</label>
          <input
            name="billingAddress"
            onChange={this.handleChange}
            value={this.state.billingAddress}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  console.log('MAPPING FN TO PROPS')
  return {
    addNewOrder: order => dispatch(addNewOrder(order))
  }
}

export default connect(null, mapDispatch)(Checkout)
