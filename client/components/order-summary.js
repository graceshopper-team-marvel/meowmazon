import React, {Component} from 'react'
import {connect} from 'react-redux'
import {submitOrder, getOrder} from '../store/orders'

class OrderSummary extends Component {
  componentDidMount() {
    const user = this.props.user
    if (user.id) {
      this.props.fetchOrder(user.id)
    }
  }
  render() {
    let order = this.props.order
    return (
      <div className="OrderSummary">
        <div className="Title">Order Summary</div>
        <table>
          <tbody>
            <tr>
              <td>Initial Total</td>
              <td>${order.order_price / 100}</td>
            </tr>
            <tr>
              <td>Discount</td>
              <td>$0</td>
            </tr>
            <tr>
              <td>Subtotal</td>
              <td>${order.order_price / 100}</td>
            </tr>
            <tr>
              <td>Tax</td>
              <td>$0</td>
            </tr>
          </tbody>
        </table>
        <div className="Total">
          <div className="TotalLabel">Total</div>
          <div className="Amount">
            total <small>${order.order_price / 100}</small>
          </div>
        </div>
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

export default connect(mapState, mapDispatch)(OrderSummary)
