/* eslint-disable react/no-unused-state */
/* eslint-disable camelcase */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {submitOrder, getOrder} from '../store/orders'
import OrderSummary from './order-summary'
import PaymentForm from './payment-form'

class Checkout extends Component {
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

  render() {
    let order = this.props.order
    return (
      <div>
        {order.order_status === 'complete' ? (
          <div>Order submitted!</div>
        ) : (
          <div className="Checkout">
            <OrderSummary />
            <PaymentForm />
          </div>
        )}
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
