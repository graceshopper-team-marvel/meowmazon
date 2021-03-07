/* eslint-disable react/no-array-index-key */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOrders} from '../../store/admin-orders'
import {Link} from 'react-router-dom'
import Header from '../sidebar/header'

const headers = ['Id', 'Price', 'Shipping Address', 'Status', 'User Id']

export class AdminOrders extends Component {
  componentDidMount() {
    this.props.getOrders()
  }

  render() {
    const orders = this.props.orders || []
    return (
      <div>
        <Header />
        <div id="admin_table_border">
          {orders.length ? (
            <table className="admin_table">
              <tbody>
                <tr>
                  {headers.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>${order.order_price}</td>
                    <td>{order.order_shipping_address}</td>
                    <td>{order.order_status}</td>
                    <td>{order.user.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h3 />
          )}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  orders: state.orders
})

const mapDispatch = dispatch => {
  return {
    getOrders: () => dispatch(fetchOrders())
  }
}

export default connect(mapState, mapDispatch)(AdminOrders)
