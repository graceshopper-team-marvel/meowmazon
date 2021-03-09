/* eslint-disable camelcase */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {UserProfile} from './user-profile'
import {fetchOrders} from '../store/user'
import {updateUser} from '../store/admin-user'

export class UserHome extends Component {
  async componentDidMount() {
    if (!this.props.orders) {
      await this.props.fetchOrders(this.props.user.id)
    }
    console.log('PROPS', this.props)
  }

  render() {
    const {user_email} = this.props
    const orders = this.props.orders || []
    return (
      <div>
        <h3>Welcome, {user_email}</h3>
        <div>
          <h1>Your Orders:</h1>
        </div>
        <table className="user_table">
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>Order ID: {order.id}</td>
                <td>Total paid: ${order.order_price / 100}</td>
                <td>Shipped to: {order.order_shipping_address}</td>
                <td>Order Status: {order.order_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1>Update your profile:</h1>
          <UserProfile
            user={this.props.user}
            updateUser={this.props.updateUser}
          />
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user_email: state.user.user_email,
    user: state.user,
    orders: state.user.orders
  }
}

const mapDispatch = dispatch => ({
  fetchOrders: id => dispatch(fetchOrders(id)),
  updateUser: user => dispatch(updateUser(user, history))
})

export default connect(mapState, mapDispatch)(UserHome)

UserHome.propTypes = {
  user_email: PropTypes.string
}
