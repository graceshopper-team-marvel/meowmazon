import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addNewOrder} from '../store'

class Checkout extends Component {
  constructor() {
    super()
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
    return this.props.cart.reduce((total, product) => {
      total += product.product_price
      return total
    }, 0)
  }

  render() {
    return (
      <div>
        <div id="totalPrice">
          <h1>Your total:</h1>
          {this.calculatePrice()}
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

const mapDispatch = dispatch => ({
  addNewOrder: order => dispatch(addNewOrder(order))
})

export default connect(null, mapDispatch)(Checkout)
