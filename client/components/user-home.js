/* eslint-disable camelcase */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {UserProfile} from './user-profile'
import {fetchOrders} from '../store/user'

export class UserHome extends Component {
  async componentDidMount() {
    // if (!this.props.orders) {
    //   await this.props.fetchOrders()
    // }
  }

  render() {
    const {user_email} = this.props
    const orders = this.props.orders || []
    console.log('USER HOME ORDERS', orders)
    return (
      <div>
        <h3>Welcome, {user_email}</h3>
        <div>
          <h1>Your Orders:</h1>
        </div>
        {/* <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>${order.order_price}</td>
              <td>{order.order_shipping_address}</td>
              <td>{order.order_status}</td>
              <td>{order.user.id}</td>
            </tr>
          ))}
        </tbody> */}

        <div>
          <h1>Update your profile:</h1>
          <UserProfile user={this.props.user} />
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
  fetchOrders: () => dispatch(fetchOrders())
})

export default connect(mapState, mapDispatch)(UserHome)

UserHome.propTypes = {
  user_email: PropTypes.string
}
