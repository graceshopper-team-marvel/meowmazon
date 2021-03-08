import React, {Component} from 'react'
import {connect} from 'react-redux'
import {submitOrder, getOrder} from '../store/orders'

class Checkout extends Component {
  constructor() {
    super()
    this.state = {
      shippingAddress: '',
      billingAddress: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const user = this.props.user
    if (user.id) {
      this.props.fetchOrder(user.id)
    }
    if (user.user_billing_address) {
      this.setState({
        shippingAddress: user.user_shipping_address,
        billingAddress: user.user_billing_address
      })
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.submitOrder({
      id: this.props.order.id,
      order_shipping_address: this.state.shippingAddress,
      order_billing_address: this.state.billingAddress
    })
    this.setState({
      shippingAddress: '',
      billingAddress: ''
    })
  }

  render() {
    let order = this.props.order
    return (
      <div>
        <div id="totalPrice">
          <h1>Your total: {order.order_price / 100}</h1>
        </div>
        <form id="checkoutForm" onSubmit={this.handleSubmit}>
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

const mapState = state => {
  return {user: state.user, order: state.order}
}

const mapDispatch = dispatch => {
  return {
    fetchOrder: userId => dispatch(getOrder(userId)),
    submitOrder: order => dispatch(submitOrder(order))
  }
}

export default connect(mapState, mapDispatch)(Checkout)
