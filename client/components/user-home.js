/* eslint-disable camelcase */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {UserProfile} from './user-profile'
import {fetchOrders} from '../store/user'
import {updateUser} from '../store/admin-user'

const headers = ['Id', 'Price', 'Shipping Address', 'Status']

export class UserHome extends Component {
  async componentDidMount() {
    if (!this.props.orders) {
      await this.props.fetchOrders(this.props.user.id)
    }
  }

  render() {
    const {user_email} = this.props
    const orders = this.props.orders || []
    return (
      <div>
        <h1 id="userWelcome">Welcome, {user_email}</h1>
        <div>
          <h3 className="userProfileTitle">My Orders</h3>
        </div>
        <div>
          <table className="admin_table">
            <tbody>
              <tr>
                {headers.map((header, index) => <th key={index}>{header}</th>)}
              </tr>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>${order.order_price / 100}</td>
                  <td>{order.order_shipping_address}</td>
                  <td>{order.order_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <h3 className="userProfileTitle">My Profile</h3>
            <UserProfile
              user={this.props.user}
              updateUser={this.props.updateUser}
            />
          </div>
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
